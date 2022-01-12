using System;

namespace Mb.Models.Exceptions
{
    public class ModelBuilderInvalidOperationException : Exception
    {
        public ModelBuilderInvalidOperationException(string message) : base(message)
        {

        }
    }
}