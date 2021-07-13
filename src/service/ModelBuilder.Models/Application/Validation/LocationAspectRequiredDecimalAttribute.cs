using System.ComponentModel.DataAnnotations;
using Mb.Models.Enums;

namespace Mb.Models.Application.Validation
{
    public class LocationAspectRequiredDecimalAttribute : ValidationAttribute
    {
        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            var nodeAm = validationContext.ObjectInstance as NodeAm;
            if (nodeAm?.Aspect == Aspect.Location)
            {
                if(value is decimal valueAsDecimal && (decimal?) valueAsDecimal > 0)
                    return ValidationResult.Success;
                else
                {
                    var memberName = validationContext.MemberName ?? "";
                    var result = new ValidationResult($"Property {memberName} is required when aspect is Location");
                    return result;
                }
            }else if (nodeAm?.Aspect == null)
            {
                return new ValidationResult("Aspect is required");
            }
            else
            {
                return base.IsValid(value, validationContext);
            }
        }
    }
}
