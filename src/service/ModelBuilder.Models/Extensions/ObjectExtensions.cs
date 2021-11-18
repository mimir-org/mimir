﻿using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Mb.Models.Application;

namespace Mb.Models.Extensions
{
    public static class ObjectExtensions
    {
        public static Validation ValidateObject(this object obj)
        {
            var validation = new Validation();

            var context = new ValidationContext(obj, null, null);
            var results = new List<ValidationResult>();

            validation.IsValid = Validator.TryValidateObject(obj, context, results, true);
            if (validation.IsValid)
                return validation;

            validation.Result = results;
            return validation;
        }
    }
}
