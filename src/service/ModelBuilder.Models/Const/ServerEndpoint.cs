namespace Mb.Models.Const;

public static class ServerEndpoint
{
    private const string Version = @"v1";
    public const string Project = $"/{Version}/project";
    public const string Block = $"/{Version}/block";
    public const string Connector = $"/{Version}/connector";
}