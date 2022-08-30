namespace Mb.Models.Data
{
    public class Unit
    {
        public string Id { get; set; }
        public string Iri { get; set; }
        public string UnitTypeId { get; set; }
        public string UnitTypeIri { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Symbol { get; set; }
        public string Kind => nameof(Unit);
    }
}