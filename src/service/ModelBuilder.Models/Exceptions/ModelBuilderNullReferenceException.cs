using System;

namespace Mb.Models.Exceptions
{
    [Serializable]
    public class ModelBuilderNullReferenceException : Exception
    {
        public ModelBuilderNullReferenceException(string message) : base(message)
        {

        }
    }
}
