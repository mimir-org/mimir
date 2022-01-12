using System;

namespace Mb.Models.Exceptions
{
    [Serializable]
    public class ModelBuilderModuleException : Exception
    {
        public ModelBuilderModuleException(string message) : base(message)
        {

        }
    }
}