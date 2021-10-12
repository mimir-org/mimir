using System;

namespace Mb.Models.Exceptions
{
    [Serializable]
    public class ModelBuilderConfigurationException : Exception
    {
        public ModelBuilderConfigurationException(string message) : base(message)
        {

        }
    }
}
