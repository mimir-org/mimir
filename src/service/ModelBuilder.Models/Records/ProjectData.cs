using System.Collections.Generic;
using System.Threading.Tasks;
using Mb.Models.Data;

namespace Mb.Models.Records
{
    public record ProjectData
    {
        public List<Node> Nodes { get; init; } = new();
        public List<Edge> Edges { get; init; } = new();
        public List<Attribute> Attributes { get; init; } = new();
        public List<Transport> Transports { get; init; } = new();
        public List<Interface> Interfaces { get; init; } = new();
        public List<Terminal> Terminals { get; init; } = new();
        public List<Relation> Relations { get; init; } = new();
        public List<Simple> Simples { get; init; } = new();

        /// <summary>
        /// Deconstruct and flatten node
        /// </summary>
        /// <param name="node">Node to deconstruct</param>
        public Task DeconstructNode(Node node)
        {
            if (node == null)
                return Task.CompletedTask;

            Nodes.Add(node);
            Attributes.AddRange(node.Attributes ?? new List<Attribute>());

            if (node.Connectors != null)
            {
                foreach (var connector in node.Connectors)
                {
                    switch (connector)
                    {
                        case Terminal t:
                            Terminals.Add(t);
                            Attributes.AddRange(t.Attributes ?? new List<Attribute>());
                            break;
                        case Relation r:
                            Relations.Add(r);
                            break;
                    }
                }
            }

            if (node.Simples == null)
                return Task.CompletedTask;

            foreach (var simple in node.Simples)
            {
                Simples.Add(simple);
                Attributes.AddRange(simple.Attributes ?? new List<Attribute>());
            }

            return Task.CompletedTask;
        }

        /// <summary>
        /// Deconstruct and flatten edge
        /// </summary>
        /// <param name="edge">Edge to deconstruct</param>
        public Task DeconstructEdge(Edge edge)
        {
            if (edge == null)
                return Task.CompletedTask;

            Edges.Add(edge);

            if (edge.Transport != null)
            {
                Transports.Add(edge.Transport);
                if (edge.Transport.Attributes != null)
                    Attributes.AddRange(edge.Transport.Attributes ?? new List<Attribute>());

                if (edge.Transport.InputTerminal != null)
                {
                    Terminals.Add(edge.Transport.InputTerminal);
                    if (edge.Transport.InputTerminal.Attributes != null)
                        Attributes.AddRange(edge.Transport.InputTerminal.Attributes ?? new List<Attribute>());
                }

                if (edge.Transport.OutputTerminal != null)
                {
                    Terminals.Add(edge.Transport.OutputTerminal);
                    if (edge.Transport.OutputTerminal.Attributes != null)
                        Attributes.AddRange(edge.Transport.OutputTerminal.Attributes ?? new List<Attribute>());
                }
            }

            if (edge.Interface != null)
            {
                Interfaces.Add(edge.Interface);
                if (edge.Interface.Attributes != null)
                    Attributes.AddRange(edge.Interface.Attributes ?? new List<Attribute>());

                if (edge.Interface.InputTerminal != null)
                {
                    Terminals.Add(edge.Interface.InputTerminal);
                    if (edge.Interface.InputTerminal.Attributes != null)
                        Attributes.AddRange(edge.Interface.InputTerminal.Attributes ?? new List<Attribute>());
                }

                if (edge.Interface.OutputTerminal != null)
                {
                    Terminals.Add(edge.Interface.OutputTerminal);
                    if (edge.Interface.OutputTerminal.Attributes != null)
                        Attributes.AddRange(edge.Interface.OutputTerminal.Attributes ?? new List<Attribute>());
                }
            }

            return Task.CompletedTask;
        }
    }
}