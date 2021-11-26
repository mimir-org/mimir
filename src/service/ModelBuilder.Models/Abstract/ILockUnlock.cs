namespace Mb.Models.Abstract
{
    public interface ILockUnlock
    {
        bool IsLocked { get; set; }
        string IsLockedStatusBy { get; set; }
    }
}