using System.Collections.Generic;

namespace Mb.Models.Application
{
    public class Library
    {
        public ICollection<LibraryNodeItem> ObjectBlocks { get; set; }
        public ICollection<LibraryInterfaceItem> Interfaces { get; set; }
        public ICollection<LibraryTransportItem> Transports { get; set; }
        public ICollection<LibrarySubProjectItem> SubProjects { get; set; }
    }
}
