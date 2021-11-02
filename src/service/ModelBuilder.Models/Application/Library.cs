using System.Collections.Generic;

namespace Mb.Models.Application
{
    public class Library
    {
        public IEnumerable<LibraryNodeItem> ObjectBlocks { get; set; }
        public ICollection<LibraryInterfaceItem> Interfaces { get; set; }
        public ICollection<LibraryTransportItem> Transports { get; set; }
        public ICollection<LibrarySubProjectItem> SubProjects { get; set; }
    }
}
