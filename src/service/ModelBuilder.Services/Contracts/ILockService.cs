using Mb.Models.Application;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Mb.Services.Contracts;

public interface ILockService
{
    IEnumerable<string> GetLockedAspectObjects();
    Task Lock(LockAm lockAm);
}