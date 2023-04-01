using System;

namespace Mb.Models.Attributes;

[AttributeUsage(AttributeTargets.Interface | AttributeTargets.Class)]
public sealed class SingletonAttribute : Attribute
{
}