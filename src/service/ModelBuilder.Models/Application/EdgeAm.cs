﻿namespace Mb.Models.Application
{
    public class EdgeAm
    {
        public string Id { get; set; }
        public string Iri { get; set; }
        public string Domain { get; set; }
        public string ProjectId { get; set; }
        public string FromConnectorId { get; set; }
        public string ToConnectorId { get; set; }
        public string FromNodeId { get; set; }
        public string ToNodeId { get; set; }
        public string MasterProjectId { get; set; }
        public string MasterProjectIri { get; set; }
        public TransportAm Transport { get; set; }
        public InterfaceAm Interface { get; set; }
    }
}
