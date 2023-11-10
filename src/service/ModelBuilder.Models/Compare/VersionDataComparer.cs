using System;
using System.Collections.Generic;
using Mb.Models.Data;

namespace Mb.Models.Compare;

public class VersionDataComparer : Comparer<VersionData>
{
    public override int Compare(VersionData x, VersionData y)
    {
        var xVersion = x?.Ver ?? x?.Version;
        var yVersion = y?.Ver ?? y?.Version;

        if (xVersion == null || yVersion == null)
        {
            if (xVersion == null && yVersion == null)
                return 0;
            if (xVersion == null)
                return -1;
            return 1;
        }

        var verX = VersionNumber(xVersion);
        var verY = VersionNumber(yVersion);

        if (verX.major > verY.major)
            return 1;

        if (verX.major < verY.major)
            return -1;

        return verX.minor.CompareTo(verY.minor);
    }

    public (int major, int minor) VersionNumber(string version)
    {
        var result = (0, 0);

        if (string.IsNullOrWhiteSpace(version))
            return result;

        var replace = version.Replace("v", "");
        var split = replace.Split('.', StringSplitOptions.RemoveEmptyEntries);

        if (split.Length != 2)
            return result;

        if (int.TryParse(split[0], out var major))
            result.Item1 = major;

        if (int.TryParse(split[1], out var minor))
            result.Item2 = minor;

        return (result.Item1, result.Item2);
    }
}