using System;

namespace Mb.Core.Exceptions
{
    [Serializable]
    public class ModelBuilderConfigurationException : Exception
    {
        public ModelBuilderConfigurationException(string message) : base(message)
        {

        }
    }
}
