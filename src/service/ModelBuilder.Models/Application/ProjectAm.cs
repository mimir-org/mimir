using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using Mb.Models.Extensions;

namespace Mb.Models.Application
{
    public class ProjectAm : IValidatableObject
    {
        public string Id { get; set; }
        public string Iri { get; set; }
        public string Domain => Id.ResolveDomain();

        [Required]
        public string Name { get; set; }

        [Required]
        public bool IsSubProject { get; set; }
        
        public string Version { get; set; }
        public string Description { get; set; }
        public string ProjectOwner { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime Updated { get; set; }

        public ICollection<NodeAm> Nodes { get; set; } = new List<NodeAm>();
        public ICollection<EdgeAm> Edges { get; set; } = new List<EdgeAm>();

        #region Validate

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            //ProjectAm
            if (string.IsNullOrEmpty(Id))
                yield return new ValidationResult($"{nameof(Id)} can't be null or empty", new List<string> { GetType().Name });

            if (string.IsNullOrEmpty(Iri))
                yield return new ValidationResult($"{nameof(Iri)} can't be null or empty", new List<string> { GetType().Name });

            if (string.IsNullOrEmpty(Iri))
                yield return new ValidationResult($"{nameof(Iri)} can't be null or empty", new List<string> { GetType().Name });

            //Nodes
            if (Nodes.Any())
            {
                if (Nodes.GroupBy(x => x).Where(g => g.Count() > 1).Select(y => y.Key).ToList().Any())
                    yield return new ValidationResult($"{nameof(Nodes)} list has duplicate node id's", new List<string> { nameof(Nodes) });

                foreach (var nodeAm in Nodes)
                {
                    foreach (var result in nodeAm.Validate(validationContext))
                    {
                        yield return result;
                    }
                }
            }

            //Edge
            if (Edges.Any())
            {
                if (Edges.GroupBy(x => x).Where(g => g.Count() > 1).Select(y => y.Key).ToList().Any())
                    yield return new ValidationResult($"{nameof(Edges)} list has duplicate edge id's", new List<string> { nameof(Edges) });

                foreach (var nodeAm in Edges)
                {
                    foreach (var result in nodeAm.Validate(validationContext))
                    {
                        yield return result;
                    }
                }
            }
        }

        #endregion Validate
    }
}