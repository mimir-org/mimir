using Mb.Models.Application;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace Mb.Models.Extensions;

public static class ValidationExtensions
{
    public static List<ValidationResult> Validate(this ICollection<AspectObjectAm> aspectObjects, ValidationContext validationContext)
    {
        var validations = new List<ValidationResult>();

        if (aspectObjects != null && aspectObjects.Any())
        {
            if (aspectObjects.GroupBy(x => x).Where(g => g.Count() > 1).Select(y => y.Key).ToList().Any())
                validations.Add(new ValidationResult($"{nameof(aspectObjects)} list has duplicate aspectObject id's", new List<string> { nameof(aspectObjects) }));

            foreach (var aspectObject in aspectObjects)
            {
                foreach (var result in aspectObject.Validate(validationContext))
                {
                    validations.Add(result);
                }
            }
        }

        return validations;
    }

    public static List<ValidationResult> Validate(this ICollection<ConnectionAm> connections, ValidationContext validationContext)
    {
        var validations = new List<ValidationResult>();

        if (connections != null && connections.Any())
        {
            if (connections.GroupBy(x => x).Where(g => g.Count() > 1).Select(y => y.Key).ToList().Any())
                validations.Add(new ValidationResult($"{nameof(connections)} list has duplicate connection id's", new List<string> { nameof(connections) }));

            foreach (var connection in connections)
            {
                foreach (var result in connection.Validate(validationContext))
                {
                    validations.Add(result);
                }
            }
        }

        return validations;
    }
}