using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Mb.Models.Enums;
using Mb.Models.Extensions;
using Newtonsoft.Json;

namespace Mb.Models.Data
{
    [Serializable]
    public class Connector
    {
        #region Properties

        public string Id { get; set; }
        public string Iri { get; set; }

        public string Domain => Id.ResolveDomain();

        public string Name { get; set; }
        public ConnectorType Type { get; set; }
        public string SemanticReference { get; set; }
        public bool Visible { get; set; }
        public virtual string NodeId { get; set; }
        public virtual string NodeIri { get; set; }
        public bool IsRequired { get; set; }

        [JsonIgnore]
        public virtual Node Node { get; set; }

        [JsonIgnore]
        public virtual ICollection<Edge> FromEdges { get; set; }

        [JsonIgnore]
        public virtual ICollection<Edge> ToEdges { get; set; }

        #endregion
    }
}
