using Azure.AI.OpenAI;
using JetBrains.Annotations;
using Microsoft.Agents.AI;
using Microsoft.Extensions.AI;
using OpenAI;
using OpenAI.Chat;
using Shared;
using System.ClientModel;
using ChatMessage = Microsoft.Extensions.AI.ChatMessage;

Console.Clear();
Secrets secrets = SecretManager.GetSecrets();

string userId = "rwj1234";
//Aure AI
//AzureOpenAIClient client = new(new Uri(secrets.AzureOpenAiEndpoint), new ApiKeyCredential(secrets.AzureOpenAiKey));
//Open AI
OpenAIClient client = new OpenAIClient(secrets.OpenAiApiKey);
ChatClientAgent memoryExtractorAgent = client
    .GetChatClient("gpt-4.1-nano")
    .AsAIAgent(
        instructions: "Look at the user's message and extract any memory that we do not already know (or non if there aren't any memories to store)"
    );

ChatClientAgent agentWithCustomMemory = client.GetChatClient(secrets.ChatDeploymentName).AsIChatClient()
    .AsAIAgent(new ChatClientAgentOptions
    {
        ChatOptions = new()
        {
            Instructions = "You are a nice AI"
        },
        AIContextProviderFactory = (context, token) => ValueTask.FromResult<AIContextProvider>(new CustomContextProvider(memoryExtractorAgent, userId))
    });

AIAgent agentToUse = agentWithCustomMemory;

AgentThread thread = await agentToUse.GetNewThreadAsync();

while (true)
{
    Console.Write("> ");
    string? input = Console.ReadLine();
    if (!string.IsNullOrWhiteSpace(input))
    {
        ChatMessage message = new(ChatRole.User, input);
        AgentResponse response = await agentToUse.RunAsync(message, thread);
        {
            Console.WriteLine(response);
        }
    }

    Utils.Separator();
}

class CustomContextProvider : AIContextProvider
{
    private readonly ChatClientAgent _memoryExtractorAgent;
    private readonly List<string> _userFacts = [];
    private readonly string _userMemoryFilePath;

    public CustomContextProvider(ChatClientAgent memoryExtractorAgent, string userId)
    {
        _memoryExtractorAgent = memoryExtractorAgent;
        _userMemoryFilePath = Path.Combine(Path.GetTempPath(), $"{userId}.txt");
        if (File.Exists(_userMemoryFilePath))
        {
            _userFacts.AddRange(File.ReadAllLines(_userMemoryFilePath));
        }
    }

    public override ValueTask<AIContext> InvokingAsync(InvokingContext context, CancellationToken cancellationToken = default)
    {
        return new ValueTask<AIContext>(new AIContext
        {
            Instructions = string.Join(" | ", _userFacts)
        });
    }

    public override async ValueTask InvokedAsync(InvokedContext context, CancellationToken cancellationToken = new CancellationToken())
    {
        ChatMessage lastMessageFromUser = context.RequestMessages.Last();
        List<ChatMessage> inputToMemoryExtractor =
        [
            new(ChatRole.Assistant, $"We know the following about the user already and should not extract that again: {string.Join(" | ", _userFacts)}"),
            lastMessageFromUser
        ];

        ChatClientAgentResponse<MemoryUpdate> response = await _memoryExtractorAgent.RunAsync<MemoryUpdate>(inputToMemoryExtractor, cancellationToken: cancellationToken);
        foreach (string memoryToRemove in response.Result.MemoryToRemove)
        {
            _userFacts.Remove(memoryToRemove);
        }

        _userFacts.AddRange(response.Result.MemoryToAdd);
        await File.WriteAllLinesAsync(_userMemoryFilePath, _userFacts.Distinct(), cancellationToken);
    }

    [UsedImplicitly]
    private record MemoryUpdate(List<string> MemoryToAdd, List<string> MemoryToRemove);
}