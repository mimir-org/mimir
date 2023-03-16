using Mb.Models.Data;
using System.Linq;
using Mb.Models.Records;

namespace Mb.Models.Extensions
{
    // ReSharper disable once IdentifierTypo
    public static class VersionableExtensions
    {
        public static bool HasMajorChanges(this AspectObject aspectObject, ProjectEditData editData)
        {
            if (editData == null)
                return false;

            if (editData.TerminalDelete.Any(x => x.AspectObject == aspectObject.Id))
                return true;

            if (editData.RelationDelete.Any(x => x.AspectObject == aspectObject.Id))
                return true;

            return false;
        }

        public static bool HasMinorChanges(this AspectObject aspectObject, ProjectEditData editData, AspectObject other)
        {
            if (editData == null)
                return false;
            if (editData.TerminalUpdate.Any(x => x.AspectObject == aspectObject.Id) || editData.TerminalCreate.Any(x => x.AspectObject == aspectObject.Id))
                return true;
            if (editData.RelationUpdate.Any(x => x.AspectObject == aspectObject.Id) || editData.RelationCreate.Any(x => x.AspectObject == aspectObject.Id))
                return true;
            if (editData.AttributeDelete.Any(x => x.AspectObject == aspectObject.Id) || editData.AttributeUpdate.Any(x => x.AspectObject == aspectObject.Id) || editData.AttributeCreate.Any(x => x.AspectObject == aspectObject.Id))
                return true;
            if (aspectObject.Description != other.Description)
                return true;
            if (aspectObject.Name != other.Name)
                return true;
            if (aspectObject.Label != other.Label)
                return true;
            if (aspectObject.UpdatedBy != other.UpdatedBy)
                return true;

            return false;
        }

        public static bool HasMajorChanges(this ProjectDm project, ProjectEditData editData)
        {
            if (editData == null)
                return false;

            if (editData.ConnectionDelete.Any())
                return true;

            if (editData.AspectObjectDelete.Any())
                return true;

            if (editData.TerminalDelete.Any())
                return true;

            if (editData.RelationDelete.Any())
                return true;

            return false;
        }

        public static bool HasMinorChanges(this ProjectDm project, ProjectEditData editData, ProjectDm other)
        {
            if (editData == null)
                return false;

            if (editData.ConnectionUpdate.Any() || editData.ConnectionCreate.Any())
                return true;

            if (editData.AspectObjectUpdate.Any() || editData.AspectObjectCreate.Any())
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

            if (project.SubProject != other.SubProject)
                return true;

            if (project.CreatedBy != other.CreatedBy)
                return true;

            if (project.UpdatedBy != other.UpdatedBy)
                return true;

            return false;
        }
    }
}