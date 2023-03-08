using System.Collections.Generic;
using System.Threading.Tasks;
using Mb.Models.Application;
using Mb.Models.Common;
using Mb.Models.Data;
using Mb.Models.Records;

namespace Mb.Services.Contracts
{
    public interface IRemapService
    {
        /// <summary>
        /// Create edit data
        /// </summary>
        /// <param name="original">Original Mimir project</param>
        /// <param name="updated">The updated Mimir project</param>
        /// <returns>Data object with information about what data should be edited</returns>
        Task<ProjectEditData> CreateEditData(Project original, Project updated);

        /// <summary>
        /// Deconstruct a project to array of elements
        /// </summary>
        /// <param name="project">The project to deconstruct</param>
        /// <param name="data">Project Data object to fill with data</param>
        /// <returns>A task that updates project data</returns>
        Task DeConstruct(Project project, ProjectData data);

        /// <summary>
        /// Remap a project
        /// </summary>
        /// <param name="project">ProjectAm</param>
        /// <returns>IDictionary&lt;string, string&gt;</returns>
        /// <remarks>The remap function will create new id's on project and all sub objects, if the
        /// id is missing or legal.The function will also create iri for all objects.</remarks>
        IDictionary<string, string> Remap(ProjectAm project);

        /// <summary>
        /// Clone a project
        /// </summary>
        /// <param name="project">ProjectAm</param>
        /// <returns>IDictionary&lt;string, string&gt;</returns>
        /// <remarks>The clone function will create a new project and sub objects, based on
        /// the predefined object.</remarks>
        IDictionary<string, string> Clone(ProjectAm project);

        /// <summary>
        /// Remap a collection of nodes and all sub objects.
        /// </summary>
        /// <param name="project">ReplacementId</param>
        /// <param name="nodes">ICollection&lt;NodeAm&gt; nodes</param>
        /// <param name="connections">ICollection&lt;ConnectionAm&gt; connections</param>
        /// <param name="remap">Dictionary&lt;string, string&gt; remap</param>
        /// <param name="createCopy">bool</param>
        /// <returns>IEnumerable&lt;NodeAm&gt;</returns>
        /// <remarks>If id is not correct, it will create new unique id's for all nodes and children objects.
        /// The createCopy parameter will always create new id's for all objects, and make a deep copy. The remap function will also create iri.</remarks>
        IEnumerable<AspectObjectAm> RemapNodes(ReplacementId project, ICollection<AspectObjectAm> nodes, ICollection<ConnectionAm> connections, Dictionary<string, string> remap, bool createCopy);

        /// <summary>
        /// Remap a collection of connections and all sub objects.
        /// </summary>
        /// <param name="project">ReplacementId</param>
        /// <param name="connections">ICollection&lt;ConnectionAm&gt;</param>
        /// <param name="remap">Dictionary&lt;string, string&gt;</param>
        /// <param name="createCopy">bool</param>
        /// <returns>IEnumerable&lt;ConnectionAm&gt;</returns>
        /// <remarks>If id is not correct, it will create new unique id's for all connections and children objects.
        /// The createCopy parameter will always create new id's for all objects, and make a deep copy. The remap function will also create iri.</remarks>
        IEnumerable<ConnectionAm> RemapConnections(ReplacementId project, ICollection<ConnectionAm> connections, Dictionary<string, string> remap, bool createCopy);

        /// <summary>
        /// Remap all parentless connections to root nodes
        /// </summary>
        /// <param name="project">ProjectAm</param>
        /// <remarks>If there is some connections that is not connected to a parent, we need to find
        /// a root node in same aspect, and connect the part of relation to that node.</remarks>
        void RemapParentlessConnections(ProjectAm project);

        MasterProject ResolveMasterProject(string oldProjectId, string oldProjectIri, string projectId, string projectIri, string masterProjectId, string masterProjectIri);
    }
}