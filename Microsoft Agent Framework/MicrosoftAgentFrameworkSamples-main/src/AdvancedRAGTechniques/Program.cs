//YouTube video that cover this sample: https://youtu.be/0Lt1rmOEZNs

using AdvancedRAGTechniques;
using Azure.AI.OpenAI;
using Microsoft.Extensions.AI;
using Microsoft.SemanticKernel.Connectors.SqlServer;
using OpenAI;
using Shared;
using System.ClientModel;
using System.Text.Json;
using UsingRAGInAgentFramework.Models;

Console.Clear();
//Prep + Embedding
string jsonWithMovies = await File.ReadAllTextAsync("made_up_movies.json");
Movie[] movieDataForRag = JsonSerializer.Deserialize<Movie[]>(jsonWithMovies)!;

Secrets secrets = SecretManager.GetSecrets();
//Azure version
//AzureOpenAIClient client = new(new Uri(secrets.AzureOpenAiEndpoint), new ApiKeyCredential(secrets.AzureOpenAiKey));
//OpenAI version
OpenAIClient client = new OpenAIClient(secrets.OpenAiApiKey);

Microsoft.Extensions.AI.IEmbeddingGenerator<string, Embedding<float>> embeddingGenerator = client
    .GetEmbeddingClient("text-embedding-3-small")
    .AsIEmbeddingGenerator();

//Microsoft.SemanticKernel.Connectors.InMemory.InMemoryVectorStore vectorStore =
//    new(new InMemoryVectorStoreOptions
//    {
//        EmbeddingGenerator = embeddingGenerator
//    });

Microsoft.SemanticKernel.Connectors.SqlServer.SqlServerVectorStore vectorStore = new Sql
    ServerVectorStore(
    "Server=(local);Database=sample;Trusted_Connection=true;TrustServerCertificate=True", new SqlServerVectorStoreOptions
    {
        EmbeddingGenerator = embeddingGenerator
    });

SqlServerCollection<Guid, MovieVectorStoreRecord> collection = vectorStore.GetCollection<Guid, MovieVectorStoreRecord>("movies");

bool importData = false;
if (!await collection.CollectionExistsAsync())
{
    importData = true;
}
else
{
    Console.WriteLine("Re-import data?");
    ConsoleKeyInfo key = Console.ReadKey();
    if (key.Key == ConsoleKey.Y)
    {
        importData = true;
    }
}

ChatMessage question = new(ChatRole.User, "What is the 3 highest rated adventure movies?");

//await Option1RephraseQuestion.Run(importData, movieDataForRag, question, client, collection, secrets);
//await Option2EnhanceEmbeddings.Run(importData, movieDataForRag, question, client, collection, secrets);
await Option3CommonSense.Run(importData, movieDataForRag, question, client, collection, secrets);