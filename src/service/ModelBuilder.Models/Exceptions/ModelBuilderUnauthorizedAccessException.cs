using System;

namespace Mb.Models.Exceptions
{
    public class ModelBuilderUnauthorizedAccessException : Exception
    {
        public ModelBuilderUnauthorizedAccessException(string message) : base(message)
        {

        }
    }
}
