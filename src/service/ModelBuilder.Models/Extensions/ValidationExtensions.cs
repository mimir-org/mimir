using Mb.Models.Application;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace Mb.Models.Extensions;

public static class ValidationExtensions
{
    public static List<ValidationResult> Validate(this ICollection<BlockRequest> blocks, ValidationContext validationContext)
    {
        var validations = new List<ValidationResult>();

        if (blocks != null && blocks.Any())
        {
            if (blocks.GroupBy(x => x).Where(g => g.Count() > 1).Select(y => y.Key).ToList().Any())
                validations.Add(new ValidationResult($"{nameof(blocks)} list has duplicate block id's", new List<string> { nameof(blocks) }));

            foreach (var block in blocks)
            {
                foreach (var result in block.Validate(validationContext))
                {
                    validations.Add(result);
                }
            }
        }

        return validations;
    }

    public static List<ValidationResult> Validate(this ICollection<ConnectionRequest> connections, ValidationContext validationContext)
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