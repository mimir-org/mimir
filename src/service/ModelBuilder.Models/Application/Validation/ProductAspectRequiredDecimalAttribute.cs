using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Mb.Models.Enums;

namespace Mb.Models.Application.Validation
{
    public class ProductAspectRequiredDecimalAttribute : ValidationAttribute
    {
        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            var nodeAm = validationContext.ObjectInstance as NodeAm;
            if (nodeAm?.Aspect == Aspect.Product)
            {
                if (value is decimal valueAsDecimal && (decimal?) valueAsDecimal > 0)
                    return ValidationResult.Success;
                else
                {
                    var memberName = validationContext.MemberName ?? "";
                    var result = new ValidationResult($"Property {memberName} is required when aspect is Location");
                    return result;
                }
            }
            else if (nodeAm?.Aspect == null)
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