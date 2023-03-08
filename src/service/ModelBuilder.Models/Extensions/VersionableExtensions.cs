using Mb.Models.Data;
using System.Linq;
using Mb.Models.Records;

namespace Mb.Models.Extensions
{
    // ReSharper disable once IdentifierTypo
    public static class VersionableExtensions
    {
        public static bool HasMajorChanges(this AspectObject node, ProjectEditData editData)
        {
            if (editData == null)
                return false;

            if (editData.TerminalDelete.Any(x => x.AspectObjectId == node.Id))
                return true;

            if (editData.RelationDelete.Any(x => x.AspectObjectId == node.Id))
                return true;

            return false;
        }

        public static bool HasMinorChanges(this AspectObject node, ProjectEditData editData, AspectObject other)
        {
            if (editData == null)
                return false;
            if (editData.TerminalUpdate.Any(x => x.AspectObjectId == node.Id) || editData.TerminalCreate.Any(x => x.AspectObjectId == node.Id))
                return true;
            if (editData.RelationUpdate.Any(x => x.AspectObjectId == node.Id) || editData.RelationCreate.Any(x => x.AspectObjectId == node.Id))
                return true;
            if (editData.AttributeDelete.Any(x => x.NodeId == node.Id || x.NodeIri == node.Iri) || editData.AttributeUpdate.Any(x => x.NodeId == node.Id || x.NodeIri == node.Iri) || editData.AttributeCreate.Any(x => x.NodeId == node.Id || x.NodeIri == node.Iri))
                return true;
            if (node.Description != other.Description)
                return true;
            if (node.Name != other.Name)
                return true;
            if (node.Label != other.Label)
                return true;
            if (node.UpdatedBy != other.UpdatedBy)
                return true;

            return false;
        }

        public static bool HasMajorChanges(this Project project, ProjectEditData editData)
        {
            if (editData == null)
                return false;

            if (editData.ConnectionDelete.Any())
                return true;

            if (editData.NodeDelete.Any())
                return true;

            if (editData.TerminalDelete.Any())
                return true;

            if (editData.RelationDelete.Any())
                return true;

            return false;
        }

        public static bool HasMinorChanges(this Project project, ProjectEditData editData, Project other)
        {
            if (editData == null)
                return false;

            if (editData.ConnectionUpdate.Any() || editData.ConnectionCreate.Any())
                return true;

            if (editData.NodeUpdate.Any() || editData.NodeCreate.Any())
                return true;

            if (editData.TerminalUpdate.Any() || editData.TerminalCreate.Any())
                return true;

            if (editData.RelationUpdate.Any() || editData.RelationCreate.Any())
                return true;

            if (editData.AttributeDelete.Any() || editData.AttributeUpdate.Any() || editData.AttributeCreate.Any())
                return true;

            if (project.Description != other.Description)
                return true;

            if (project.Name != other.Name)
                return true;

            if (project.IsSubProject != other.IsSubProject)
                return true;

            if (project.ProjectOwner != other.ProjectOwner)
                return true;

            if (project.UpdatedBy != other.UpdatedBy)
                return true;

            return false;
        }
    }
}