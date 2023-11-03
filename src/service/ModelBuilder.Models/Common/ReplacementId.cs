using System;

namespace Mb.Models.Common;

public class ReplacementId
{
    public Guid? FromId { get; set; }
    public string FromIri { get; set; }
    public Guid ToId { get; set; }
    public string ToIri { get; set; }
}