using AgentFrameworkToolkit;
using AgentFrameworkToolkit.AzureOpenAI;
using AgentFrameworkToolkit.OpenAI;
using Azure.AI.OpenAI;
using Microsoft.Agents.AI;
using Microsoft.Extensions.AI;
using OpenAI;
using OpenAI.Chat;
using OpenAI.Responses;
using Shared;
using Shared.Extensions;
using System.ClientModel;
using ChatMessage = Microsoft.Extensions.AI.ChatMessage;

#pragma warning disable OPENAI001
Secrets secrets = SecretManager.GetSecrets();
string endpoint = secrets.AzureOpenAiEndpoint;
string apiKey = secrets.AzureOpenAiKey;
string question = "What is the Capital of France and how many people live there? (Answer back in max 3 words)";

/* OpenAI Models that can use reasoning:
 - o1 models
 - o3 models
 - o4 models
 - gpt-5 models
 (expect all future model can do reasoning)
 */

Console.Clear();
Utils.WriteLineGreen("Baseline (Reason = Default (Medium))");
await Baseline();
Utils.Separator();
Utils.WriteLineGreen("Raw: ChatClient (Reason = Minimal)");
await RawChatClient();
Utils.Separator();
Utils.WriteLineGreen("Raw: ResponseAPI (Reason = High)");
await RawResponsesApi();
Utils.Separator();
Utils.WriteLineGreen("Agent Framework Toolkit: ChatClient (Reason = Minimal)");
await AgentFrameworkToolkitChatClient();
Utils.Separator();
Utils.WriteLineGreen("Agent Framework Toolkit: ResponsesAPI (Reason = High)");
await AgentFrameworkToolkitResponseApi();

/* Notes on various OpenAI-Based Models:
   - xAI (Grok) seems unable to use this (Throw an exception if set).
   - DeepSeek (via example OpenRouter) allow this to be set, but it seems to ignore it. 
 */

return;

async Task Baseline()
{
    // Azure version
    //AzureOpenAIClient azureOpenAiClient = new(new Uri(endpoint), new ApiKeyCredential(apiKey));

    // OpenAI version
    OpenAIClient client = new OpenAIClient(secrets.OpenAiApiKey);

    // Azure version
    //ChatClientAgent agent = azureOpenAiClient
    //    .GetChatClient("gpt-5-mini")
    //    .AsAIAgent();

    // OpenAI version
    ChatClientAgent agent = client
        .GetChatClient("gpt-4.1-mini")
        .AsAIAgent();

    AgentResponse response = await agent.RunAsync(question);
    response.Usage.OutputAsInformation();
    Console.WriteLine(response);
}

async Task RawChatClient()
{//Azure Version 
    //AzureOpenAIClient azureOpenAiClient = new(new Uri(endpoint), new ApiKeyCredential(apiKey));
    
    //OpenAI version 
    OpenAIClient azureOpenAiClient = new OpenAIClient(secrets.OpenAiApiKey);
    ChatClientAgent agent = azureOpenAiClient
        .GetChatClient("gpt-4.1-mini")
        .AsAIAgent(
            options: new ChatClientAgentOptions
            {
                ChatOptions = new ChatOptions
                {
                    RawRepresentationFactory = _ => new ChatCompletionOptions
                    {
                        ReasoningEffortLevel = ChatReasoningEffortLevel.Minimal
                    },
                }
            });

    AgentResponse response = await agent.RunAsync(question);
    //Note that the reasoning summary is not possible to get with ChatClient
    Console.WriteLine(response);
    response.Usage.OutputAsInformation();
}

async Task RawResponsesApi()
{//Azure Version
    AzureOpenAIClient azureOpenAiClient = new(new Uri(endpoint), new ApiKeyCredential(apiKey));
    
    //OpenAI version
    OpenAIClient client = new OpenAIClient(secrets.OpenAiApiKey);
    ChatClientAgent agent = azureOpenAiClient
        .GetResponsesClient("gpt-4.1-mini")
        .AsAIAgent(
            options: new ChatClientAgentOptions
            {
                ChatOptions = new ChatOptions
                {
                    RawRepresentationFactory = _ => new CreateResponseOptions
                    {
                        ReasoningOptions = new ResponseReasoningOptions
                        {
                            ReasoningEffortLevel = ResponseReasoningEffortLevel.High,
                            ReasoningSummaryVerbosity = ResponseReasoningSummaryVerbosity.Detailed
                        }
                    }
                }
            });

    AgentResponse response = await agent.RunAsync(question);
    foreach (ChatMessage message in response.Messages)
    {
        foreach (AIContent content in message.Contents)
        {
            if (content is TextReasoningContent textReasoningContent)
            {
                Utils.WriteLineYellow("Reasoning Text");
                Utils.WriteLineDarkGray(textReasoningContent.Text);
            }
        }
    }

    Console.WriteLine(response);
    response.Usage.OutputAsInformation();
}

async Task AgentFrameworkToolkitChatClient()
{
    AzureOpenAIAgentFactory agentFactory = new(endpoint, apiKey);

    AzureOpenAIAgent agent = agentFactory.CreateAgent(new AgentOptions
    {
        Model = OpenAIChatModels.Gpt5Mini,
        ReasoningEffort = OpenAIReasoningEffort.Minimal
    });

    AgentResponse response = await agent.RunAsync(question);
    Console.WriteLine(response);
    response.Usage.OutputAsInformation();
}

async Task AgentFrameworkToolkitResponseApi()
{
    AzureOpenAIAgentFactory agentFactory = new(endpoint, apiKey);

    AzureOpenAIAgent agent = agentFactory.CreateAgent(new AgentOptions
    {
        ClientType = ClientType.ResponsesApi,
        Model = OpenAIChatModels.Gpt5Mini,
        ReasoningEffort = OpenAIReasoningEffort.High,
        ReasoningSummaryVerbosity = OpenAIReasoningSummaryVerbosity.Detailed
    });

    AgentResponse response = await agent.RunAsync(question);
    Console.WriteLine(response);
    TextReasoningContent? reasoningContent = response.GetTextReasoningContent();
    if (reasoningContent != null)
    {
        Utils.WriteLineYellow("Reasoning Text");
        Utils.WriteLineDarkGray(reasoningContent.Text);
    }

    response.Usage.OutputAsInformation();
}