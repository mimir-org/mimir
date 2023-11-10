using Mb.Models.Data;
using System.Linq;
using Mb.Models.Records;

namespace Mb.Models.Extensions;

// ReSharper disable once IdentifierTypo
public static class VersionableExtensions
{
    public static bool HasMajorChanges(this Block block, ProjectEditData editData)
    {
        if (editData == null)
            return false;

        if (editData.TerminalDelete.Any(x => x.Block == block.Id))
            return true;

        if (editData.RelationDelete.Any(x => x.Block == block.Id))
            return true;

        return false;
    }

    public static bool HasMinorChanges(this Block block, ProjectEditData editData, Block other)
    {
        if (editData == null)
            return false;
        if (editData.TerminalUpdate.Any(x => x.Block == block.Id) || editData.TerminalCreate.Any(x => x.Block == block.Id))
            return true;
        if (editData.RelationUpdate.Any(x => x.Block == block.Id) || editData.RelationCreate.Any(x => x.Block == block.Id))
            return true;
        if (editData.AttributeDelete.Any(x => x.Block == block.Id) || editData.AttributeUpdate.Any(x => x.Block == block.Id) || editData.AttributeCreate.Any(x => x.Block == block.Id))
            return true;
        if (block.Description != other.Description)
            return true;
        if (block.Name != other.Name)
            return true;
        if (block.Label != other.Label)
            return true;
        if (block.UpdatedBy != other.UpdatedBy)
            return true;

        return false;
    }

    public static bool HasMajorChanges(this Project project, ProjectEditData editData)
    {
        if (editData == null)
            return false;

        if (editData.ConnectionDelete.Any())
            return true;

        if (editData.BlockDelete.Any())
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

        if (editData.BlockUpdate.Any() || editData.BlockCreate.Any())
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