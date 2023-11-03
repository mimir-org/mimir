using Mb.Models.Application;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Mb.Services.Contracts;

public interface ILockService
{
    IEnumerable<Guid> GetLockedBlocks();
    Task Lock(LockAm lockAm);
}