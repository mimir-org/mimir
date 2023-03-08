using Mb.Models.Application;
using Mimirorg.TypeLibrary.Models.Client;

namespace ModelBuilder.Rdf.Models
{
    public record ProjectData
    {
        public ICollection<AspectObjectAm> Nodes { get; init; } = default!;
        public ICollection<ConnectionAm> Connections { get; init; } = default!;

        public ICollection<UnitLibCm> Units { get; init; } = default!;
        public Dictionary<string, QuantityDatumCm> QuantityDatums { get; init; } = default!;
    }
}