using System;

namespace Mb.Core.Exceptions
{
    [Serializable]
    public class ModelBuilderNullReferenceException : Exception
    {
        public ModelBuilderNullReferenceException(string message) : base(message)
        {

        }
    }
}
