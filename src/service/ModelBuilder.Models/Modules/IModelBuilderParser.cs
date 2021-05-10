﻿using System.Threading.Tasks;
using Mb.Models.Data;

namespace Mb.Models.Modules
{
    public interface IModelBuilderParser : IModuleInterface
    {
        Task<byte[]> SerializeProject(Project project);
        Task<Project> DeserializeProject(byte[] data);
    }
}
