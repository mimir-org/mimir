using System.Collections.Generic;

namespace Mb.Models.Client
{
    public class PrepareCm
    {
        public string SubProjectId { get; set; }
        public ICollection<AspectObjectCm> AspectObjects { get; set; } = new List<AspectObjectCm>();
        public ICollection<ConnectionCm> Connections { get; set; } = new List<ConnectionCm>();
    }
}