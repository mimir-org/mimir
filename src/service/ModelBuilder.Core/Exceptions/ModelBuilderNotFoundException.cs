using System;

namespace Mb.Core.Exceptions
{
    [Serializable]
    public class ModelBuilderNotFoundException : Exception
    {
        public ModelBuilderNotFoundException(string message) : base(message)
        {

        }
    }
}
