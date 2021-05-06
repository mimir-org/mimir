namespace Mb.Core.Repositories.Contracts
{
    public interface IGenerateIdRepository
    {
        string CreateUniqueId(string version, string prefix = null);
    }
}
