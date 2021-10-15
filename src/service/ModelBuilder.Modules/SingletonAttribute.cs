using System;

namespace Mb.Modules
{
    [AttributeUsage(AttributeTargets.Interface | AttributeTargets.Class)]
    public sealed class SingletonAttribute : Attribute
    {
    }
}
