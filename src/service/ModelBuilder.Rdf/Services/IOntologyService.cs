using Mb.Models.Application;
using Mb.Models.Attributes;
using Mb.Models.Data;
using VDS.RDF;

namespace ModelBuilder.Rdf.Services;

[Scope]
public interface IOntologyService
{
    void BuildProject(Project project);
    ProjectRequest BuildProject(IGraph rdf);
    byte[] GetBytes<T>() where T : IRdfWriter, new();
    void SetBaseUri(Uri uri);
    void AssertBlock(string subject, string predicate, string obj, bool isLiteral = false);
    void AssertBlock(string subject, string predicate, INode obj);
    INode CreateLiteralBlock(string literal, Uri dataType);
    INode CreateLiteralBlock(string literal);
    INode CreateLiteralBlock(string literal, string dataType);
    Uri BuildUri(string value);
    INode GetOrCreateUriBlock(string type);
    IEnumerable<Triple> GetTriplesWithPredicateObject(string predicate, string obj);
    IEnumerable<Triple> GetTriplesWithSubjectPredicate(string subject, string predicate);
    IEnumerable<Triple> GetTriplesWithPredicate(string predicate);
    string GetValue(string iri, string predicate, bool allowMany = true, bool urlEncode = true);
    DateTime GetDateTimeValue(string iri, string predicate, bool allowMany = true);
    decimal GetDecimalValue(string iri, string predicate, bool allowMany = true);
    int? GetIntValue(string iri, string predicate, bool allowMany = true);
    T GetEnumValue<T>(string iri, string predicate, bool allowMany = true) where T : struct;
}