using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using Mb.Models.Attributes;
using Mb.Models.Extensions;

namespace Mb.Models.Application
{
    public class ProjectAm : IValidatableObject
    {
        [RequiredOne(nameof(Iri))]
        public string Id { get; set; }

        [RequiredOne(nameof(Id))]
        public string Iri { get; set; }

        public string Domain => Id.ResolveDomain();

        [Required]
        public string Name { get; set; }

        [Required]
        public bool IsSubProject { get; set; }

        [Required]
        public string Version { get; set; }

        public string Description { get; set; }

        [Required]
        public string ProjectOwner { get; set; }

        public string UpdatedBy { get; set; }

        public DateTime? Updated { get; set; }

        public ICollection<NodeAm> Nodes { get; set; } = new List<NodeAm>();
        public ICollection<EdgeAm> Edges { get; set; } = new List<EdgeAm>();

        #region Validate

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            //Nodes
            if (Nodes != null && Nodes.Any())
            {
                if (Nodes.GroupBy(x => x).Where(g => g.Count() > 1).Select(y => y.Key).ToList().Any())
                    yield return new ValidationResult($"{nameof(Nodes)} list has duplicate node id's", new List<string> { nameof(Nodes) });

                foreach (var node in Nodes)
                {
                    foreach (var result in node.Validate(validationContext))
                    {
                        yield return result;
                    }
                }
            }

            //Edge
            if (Edges != null && Edges.Any())
            {
                if (Edges.GroupBy(x => x).Where(g => g.Count() > 1).Select(y => y.Key).ToList().Any())
                    yield return new ValidationResult($"{nameof(Edges)} list has duplicate edge id's", new List<string> { nameof(Edges) });

                foreach (var edge in Edges)
                {
                    foreach (var result in edge.Validate(validationContext))
                    {
                        yield return result;
                    }
                }
            }
        }

        #endregion Validate

        #region Public Methods

        public IEnumerable<EdgeAm> GetParentlessEdges()
        {
            if (Edges == null || !Edges.Any())
                yield break;

            foreach (var edge in Edges)
            {
                var fromNode = Nodes.FirstOrDefault(x => x.Id == edge.FromNodeId);
                if (fromNode != null)
                    continue;

                yield return edge;
            }
        }

        public IEnumerable<EdgeAm> GetNotConnectedEdges()
        {
            if (Edges == null || !Edges.Any())
                yield break;

            foreach (var edge in Edges)
            {
                var fromNode = Nodes.FirstOrDefault(x => x.Id == edge.FromNodeId);
                if (fromNode == null)
                    yield return edge;

                var toNode = Nodes.FirstOrDefault(x => x.Id == edge.ToNodeId);
                if (toNode == null)
                    yield return edge;

            }
        }

        #endregion
    }
}