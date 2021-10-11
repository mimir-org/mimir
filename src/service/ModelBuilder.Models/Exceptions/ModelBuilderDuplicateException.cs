using System;

namespace Mb.Models.Exceptions
{
    [Serializable]
    public class ModelBuilderDuplicateException : Exception
    {
        public ModelBuilderDuplicateException(string message) : base(message)
        {

        }
    }
}
