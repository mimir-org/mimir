using System;
using System.Collections.Generic;
using Mb.Models.Enums;
using Mimirorg.TypeLibrary.Enums;
using Mimirorg.Common.Extensions;

namespace Mb.Models.Client;

public class BlockResponse
{
    public string Id { get; set; }
    public string Version { get; set; }
    public string Name { get; set; }
    public string Label { get; set; }
    public string Description { get; set; }
    public Aspect Aspect { get; set; }
    public BlockType BlockType { get; set; }
    public string Project { get; set; }
    public string MainProject { get; set; }
    public string LibraryType { get; set; }
    public PositionResponse PositionTree { get; set; }
    public PositionResponse PositionBlock { get; set; }
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

    public List<ConnectorResponse> Connectors { get; set; } = new();
    public List<AttributeResponse> Attributes { get; set; } = new();
}