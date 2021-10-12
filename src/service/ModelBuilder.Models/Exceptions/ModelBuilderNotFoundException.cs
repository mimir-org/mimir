using System;

namespace Mb.Models.Exceptions
{
    [Serializable]
    public class ModelBuilderNotFoundException : Exception
    {
        public ModelBuilderNotFoundException(string message) : base(message)
        {

        }
    }
}
