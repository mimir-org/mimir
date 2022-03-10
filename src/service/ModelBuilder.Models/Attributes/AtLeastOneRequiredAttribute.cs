using System;
using System.ComponentModel.DataAnnotations;
using System.Reflection;

namespace Mb.Models.Attributes
{
    [AttributeUsage(AttributeTargets.Class, AllowMultiple = true)]
    public class AtLeastOneRequiredAttribute : ValidationAttribute
    {
        private readonly string _field1;
        private readonly string _field2;

        public AtLeastOneRequiredAttribute(string field1, string field2) => (_field1, _field2) = (field1, field2);

        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            if (!TryGetProperty(_field1, validationContext, out var property1))
                return new ValidationResult($"Unknown property: {_field1}", new[] { _field1 });


            if (!TryGetProperty(_field2, validationContext, out var property2))
                return new ValidationResult($"Unknown property: {_field2}", new[] { _field1 });


            if (property1.GetValue(validationContext.ObjectInstance) != null || property2.GetValue(validationContext.ObjectInstance) != null)
                return ValidationResult.Success;

            return new ValidationResult($"Either or both of \"{_field1}\" and \"{_field2}\" are required", new[] { _field1, _field2 });
        }

        private static bool TryGetProperty(string fieldName, ValidationContext validationContext, out PropertyInfo propertyInfo)
        {
            return (propertyInfo = validationContext.ObjectType.GetProperty(fieldName)) != null;
        }
    }
}