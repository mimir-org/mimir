using System;
using Mb.Models.Enums;

namespace Mb.Models.Data;

public class ObjectIdentityDm
{
    public Guid Id { get; set; }
    public EntityType Type { get; set; }
}