using Mb.Models.Application;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace Mb.Models.Extensions
{
    public static class ValidationExtensions
    {
        public static List<ValidationResult> Validate(this ICollection<AspectObjectAm> nodes, ValidationContext validationContext)
        {
            var validations = new List<ValidationResult>();

            if (nodes != null && nodes.Any())
            {
                if (nodes.GroupBy(x => x).Where(g => g.Count() > 1).Select(y => y.Key).ToList().Any())
                    validations.Add(new ValidationResult($"{nameof(nodes)} list has duplicate node id's", new List<string> { nameof(nodes) }));

                foreach (var node in nodes)
                {
                    foreach (var result in node.Validate(validationContext))
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
}