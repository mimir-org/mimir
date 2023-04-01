using System;
using System.Collections.Generic;
using Mb.Models.Data;
using Mb.Models.Enums;
using Mimirorg.TypeLibrary.Enums;
using Mimirorg.Common.Extensions;

namespace Mb.Models.Client;

public class AspectObjectCm
{
    public string Id { get; set; }
    public string Version { get; set; }
    public string Name { get; set; }
    public string Label { get; set; }
    public string Description { get; set; }
    public Aspect Aspect { get; set; }
    public AspectObjectType AspectObjectType { get; set; }
    public string Project { get; set; }
    public string MainProject { get; set; }
    public string LibraryType { get; set; }
    public AspectObjectPositionCm Position { get; set; }
    public string ReferenceType { get; set; }
    public string CreatedBy { get; set; }
    public DateTime Created { get; set; }
    public string UpdatedBy { get; set; }
    public DateTime? Updated { get; set; }
    public string Rds { get; set; }
    public string Symbol { get; set; }
    public string Purpose { get; set; }
    public bool IsLocked { get; set; }
    public string IsLockedStatusBy { get; set; }
    public DateTime? IsLockedStatusDate { get; set; }
    public string Domain => Id.ResolveDomain();

    public List<ConnectorCm> Connectors { get; set; } = new();
    public List<AttributeCm> Attributes { get; set; } = new();
}

public class AspectObjectPositionCm
{
    public int ThreePosX { get; set; }
    public int ThreePosY { get; set; }
    public int BlockPosX { get; set; }
    public int BlockPosY { get; set; }
}