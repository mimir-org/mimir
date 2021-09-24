﻿using System.Threading.Tasks;
using Mb.Models.Application;
using Mb.Models.Data;

namespace Mb.Models.Modules
{
    public interface IModelBuilderParser : IModuleInterface
    {
        FileFormat GetFileFormat();
        Task<byte[]> SerializeProject(Project project);
        Task<Project> DeserializeProject(byte[] data);
        Task<ProjectAm> DeserializeProjectAm(byte[] data);
    }
}
