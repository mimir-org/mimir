using System;

namespace Mb.Core.Exceptions
{
    [Serializable]
    public class ModelBuilderModuleException : Exception
    {
        public ModelBuilderModuleException(string message) : base(message)
        {

        }
    }
}
