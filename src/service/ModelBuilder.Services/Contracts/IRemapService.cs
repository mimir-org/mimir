using System.Collections.Generic;
using Mb.Models.Application;
using Mb.Models.Data;

namespace Mb.Services.Contracts
{
    public interface IRemapService
    {
        IDictionary<string, string> Remap(ProjectAm project);
        ProjectAm Remap(Project fromProject, Project toProject, ICollection<string> nodes, ICollection<string> edges);
        (ICollection<Node> nodes, ICollection<Edge> edges) CreateRemap(string projectId, ICollection<Node> nodes, ICollection<Edge> edges);
    }
}