using System;
using Mb.Models.Enums;

namespace Mb.Models.Data;

public class ObjectIdentity
{
    public Guid Id { get; set; }
    public EntityType Type { get; set; }
}