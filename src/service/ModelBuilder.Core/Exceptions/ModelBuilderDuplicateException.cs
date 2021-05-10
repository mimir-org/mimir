﻿using System;

namespace Mb.Core.Exceptions
{
    [Serializable]
    public class ModelBuilderDuplicateException : Exception
    {
        public ModelBuilderDuplicateException(string message) : base(message)
        {

        }
    }
}
