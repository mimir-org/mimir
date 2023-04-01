using System.Collections.Generic;

namespace Mb.Models.Common;

public class LibrarySubProject
{
    public string Id { get; set; }
    public string Name { get; set; }
    public string Version { get; set; }
    public string Description { get; set; }
    public ICollection<LibrarySubProjectVersion> Versions { get; set; } = new List<LibrarySubProjectVersion>();
}