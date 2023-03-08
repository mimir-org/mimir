using System.Collections.Generic;
using Mb.Models.Data;

namespace Mb.Models.Client
{
    public class PrepareCm
    {
        public string SubProjectId { get; set; }
        public ICollection<AspectObject> AspectObjects { get; set; } = new List<AspectObject>();
        public ICollection<Connection> Connections { get; set; } = new List<Connection>();
    }
}