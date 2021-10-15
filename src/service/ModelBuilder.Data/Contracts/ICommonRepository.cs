namespace Mb.Data.Contracts
{
    public interface ICommonRepository
    {
        string CreateUniqueId();
        string GetDomain();
        bool HasValidId(string id);
        string CreateOrUseId(string id);
    }
}
