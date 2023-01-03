using Mb.Models.Application;
using Mb.Models.Data;
using Mimirorg.TypeLibrary.Enums;
using System.Linq;
using System;

namespace Mb.Models.Extensions
{
    // ReSharper disable once IdentifierTypo
    public static class VersionableExtensions
    {
        public static VersionStatus SetNodeVersionStatus(this Project project, ProjectAm other)
        {
            if (project == null || other == null)
                throw new NullReferenceException("Can't set node version status on null reference object");

            if (project.Nodes == null || !project.Nodes.Any())
                return VersionStatus.NoChange;

            var minor = false;
            var major = false;

            foreach (var node in project.Nodes)
            {
                var otherNode = other.Nodes?.FirstOrDefault(x => x.Id == node.Id);
                if (otherNode == null)
                {
                    // The node is deleted and this is a major version change
                    return VersionStatus.Major;
                }
                var nodeVersionStatus = node.CalculateVersionStatus(otherNode);
                node.UpdateVersion(nodeVersionStatus);

                switch (nodeVersionStatus)
                {
                    case VersionStatus.Major:
                        major = true;
                        break;
                    case VersionStatus.Minor:
                        minor = true;
                        break;
                    case VersionStatus.NoChange:
                        break;
                    default:
                        throw new ArgumentOutOfRangeException();
                }
            }

            return major ? VersionStatus.Major : minor ? VersionStatus.Minor : VersionStatus.NoChange;

        }
    }
}