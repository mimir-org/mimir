using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using Mb.Models.Enums;
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

        public ICollection<NodeAm> Nodes { get; set; }
        public ICollection<EdgeAm> Edges { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            if (Nodes == null || !Nodes.Any())
            {
                yield return new ValidationResult("Number of nodes must be greater than 0", new List<string> { "Nodes" });
            }

            //Node
            if (Nodes != null && Nodes.Any())
            {
                if (Nodes.GroupBy(x => x).Where(g => g.Count() > 1).Select(y => y.Key).ToList().Any())
                    yield return new ValidationResult("Duplicate node id's detected", new List<string> { "Nodes" });

                if (Nodes.Any(x => string.IsNullOrWhiteSpace(x.Id)))
                    yield return new ValidationResult("Id is required", new List<string> { "Nodes" });

                if (Nodes.Any(x => string.IsNullOrWhiteSpace(x.Iri)))
                    yield return new ValidationResult("Iri is required", new List<string> { "Nodes" });

                if (Nodes.Any(x => string.IsNullOrWhiteSpace(x.Name)))
                    yield return new ValidationResult("Name is required", new List<string> { "Nodes" });

                if (Nodes.Any(x => x.PositionBlockX < 1))
                    yield return new ValidationResult("PositionBlockX is required", new List<string> { "Nodes" });

                if (Nodes.Any(x => x.PositionX < 1))
                    yield return new ValidationResult("PositionX is required", new List<string> { "Nodes" });

                if (Nodes.Any(x => x.PositionBlockY < 1))
                    yield return new ValidationResult("PositionBlockY is required", new List<string> { "Nodes" });

                if (Nodes.Any(x => x.PositionY < 1))
                    yield return new ValidationResult("PositionY is required", new List<string> { "Nodes" });

                if (Nodes.Any(x => x.Created == null))
                    yield return new ValidationResult("Created is required", new List<string> { "Nodes" });

                if (Nodes.Any(x => string.IsNullOrWhiteSpace(x.CreatedBy)))
                    yield return new ValidationResult("CreatedBy is required", new List<string> { "Nodes" });

                if (Nodes.Any(x => string.IsNullOrWhiteSpace(x.LibraryTypeId)))
                    yield return new ValidationResult("LibraryTypeId is required", new List<string> { "Nodes" });
                
                if (Nodes.Any(x => x.Aspect == Aspect.None))
                    yield return new ValidationResult("Aspect 'None' is not allowed", new List<string> { "Nodes" });

                if (Nodes.Any(x => string.IsNullOrWhiteSpace(x.MasterProjectId)))
                    yield return new ValidationResult("MasterProjectId is required", new List<string> { "Nodes" });

                if (Nodes.Any(x => string.IsNullOrWhiteSpace(x.MasterProjectIri)))
                    yield return new ValidationResult("MasterProjectIri is required", new List<string> { "Nodes" });
            }

            //Edge
            if (Edges == null || !Edges.Any()) 
                yield break;

            if (Edges.GroupBy(x => x).Where(g => g.Count() > 1).Select(y => y.Key).ToList().Any())
                yield return new ValidationResult("Duplicate edge id's detected", new List<string> { "Edges" });

            if (Edges.Any(x => string.IsNullOrWhiteSpace(x.Id)))
                yield return new ValidationResult("Empty edge id's detected", new List<string> { "Edges" });

            foreach (var validateEdgeConnector in ValidateEdgeConnectors(Edges, Nodes))
                yield return validateEdgeConnector;
        }

        private List<ValidationResult> ValidateEdgeConnectors(ICollection<EdgeAm> edges, ICollection<NodeAm> nodes)
        {
            var validationResult = new List<ValidationResult>();

            if (Nodes == null || Edges == null)
                return validationResult;

            foreach (var edgeAm in edges)
            {
                if(string.IsNullOrWhiteSpace(edgeAm.FromConnectorId))
                    validationResult.Add(new ValidationResult($"Edge with id {edgeAm.Id} is missing FromConnectorId value", new List<string> { "Edges" }));

                if (string.IsNullOrWhiteSpace(edgeAm.ToConnectorId))
                    validationResult.Add(new ValidationResult($"Edge with id {edgeAm.Id} is missing ToConnectorId value", new List<string> { "Edges" }));

                if (string.IsNullOrWhiteSpace(edgeAm.FromNodeId))
                    validationResult.Add(new ValidationResult($"Edge with id {edgeAm.Id} is missing FromNodeId value", new List<string> { "Edges" }));

                if (string.IsNullOrWhiteSpace(edgeAm.ToNodeId))
                    validationResult.Add(new ValidationResult($"Edge with id {edgeAm.Id} is missing ToNodeId value", new List<string> { "Edges" }));

                if (string.IsNullOrWhiteSpace(edgeAm.FromConnectorId))
                    validationResult.Add(new ValidationResult($"Edge with id {edgeAm.Id} is missing FromConnectorId value", new List<string> { "Edges" }));

                if (string.IsNullOrWhiteSpace(edgeAm.ToConnectorId))
                    validationResult.Add(new ValidationResult($"Edge with id {edgeAm.Id} is missing ToConnectorId value", new List<string> { "Edges" }));

                if (!string.IsNullOrWhiteSpace(edgeAm.FromConnectorId) && !string.IsNullOrWhiteSpace(edgeAm.ToConnectorId))
                {
                    if (nodes.Any(n => n.Connectors.Any(c => c.Id != edgeAm.ToConnectorId)))
                        validationResult.Add(new ValidationResult($"Edge with id {edgeAm.Id} has invalid ToConnectorId", new List<string> { "Edges" }));
                    
                    if (nodes.Any(n => n.Connectors.Any(c => c.Id != edgeAm.FromConnectorId)))
                        validationResult.Add(new ValidationResult($"Edge with id {edgeAm.Id} has invalid FromConnectorId", new List<string> { "Edges" }));
                }
            }

            return validationResult;
        }
    }
}