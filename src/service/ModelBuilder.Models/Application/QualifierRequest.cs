using System;

namespace Mb.Models.Application;

public class QualifierRequest
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Value { get; set; }
}