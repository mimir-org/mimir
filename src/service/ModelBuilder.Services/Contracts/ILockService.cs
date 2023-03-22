using System.Collections.Generic;
using System.Threading.Tasks;
using Mb.Models.Application;

namespace Mb.Services.Contracts;

public interface ILockService
{
    IEnumerable<string> GetLockedAttributes();
    IEnumerable<string> GetLockedAspectObjects();
    Task Lock(LockAm lockAm);
}