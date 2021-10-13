using System;

namespace Mb.Modules
{
    [AttributeUsage(AttributeTargets.Interface | AttributeTargets.Class)]
    public class TransientAttribute : Attribute
    {
    }
}
