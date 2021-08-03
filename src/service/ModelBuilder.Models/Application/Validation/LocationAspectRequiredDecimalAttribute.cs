#nullable enable
using System.ComponentModel.DataAnnotations;
using Mb.Models.Enums;

namespace Mb.Models.Application.Validation
{
    public class LocationAspectRequiredDecimalAttribute : ValidationAttribute
    {
        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            if (!(validationContext.ObjectInstance is NodeAm nodeAm))
                return new ValidationResult("This validation attribute could only be used on a NodeAm object");

            if (nodeAm.Aspect == Aspect.Location)
            {
                if (nodeAm.IsRoot)
                    return ValidationResult.Success;

                if (value is decimal valueAsDecimal && (decimal?)valueAsDecimal > 0)
                    return ValidationResult.Success;
                
                var memberName = validationContext.MemberName ?? "";
                var result = new ValidationResult($"Property {memberName} is required when aspect is Location");
                return result;
            }

            return ValidationResult.Success;
        }
    }
}
