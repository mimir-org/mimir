namespace Mb.Core.Repositories.Contracts
{
    public interface ICommonRepository
    {
        string CreateUniqueId();
        string GetDomain();
    }
}
