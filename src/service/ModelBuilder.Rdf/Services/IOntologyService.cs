using Mb.Models.Application;
using Mb.Models.Attributes;
using Mb.Models.Data;
using VDS.RDF;

namespace ModelBuilder.Rdf.Services
{
    [Scope]
    public interface IOntologyService
    {
        void BuildProject(Project project);
        ProjectAm BuildProject(string rdf);
        byte[] GetBytes<T>() where T : IRdfWriter, new();
        void SetBaseUri(Uri uri);
        void AssertNode(string subject, string predicate, string obj, bool isLiteral = false);
        void AssertNode(string subject, string predicate, INode obj);
        INode CreateLiteralNode(string literal, Uri dataType);
        INode CreateLiteralNode(string literal);
        INode CreateLiteralNode(string literal, string dataType);
        Uri BuildUri(string value);
        INode GetOrCreateUriNode(string type);
        IEnumerable<Triple> GetTriplesWithPredicateObject(string predicate, string obj);
        IEnumerable<Triple> GetTriplesWithSubjectPredicate(string subject, string predicate);
        IEnumerable<Triple> GetTriplesWithPredicate(string predicate);
        string GetValue(string iri, string predicate, bool allowMany = true);
        DateTime GetDateTimeValue(string iri, string predicate, bool allowMany = true);
        decimal GetDecimalValue(string iri, string predicate, bool allowMany = true);
        T GetEnumValue<T>(string iri, string predicate, bool allowMany = true) where T : struct;
    }
}