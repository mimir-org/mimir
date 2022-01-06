﻿using System;
using Mb.Models.Attributes;
using VDS.RDF;

namespace RdfParserModule.Services
{
    [Scope]
    public interface IOntologyService
    {
        IGraph GetGraph();
        void SetBaseUri(Uri uri);
        void AssertTransmitter(string iri, string terminalCategoryId, string terminalName);
        void AssertNode(string subject, string predicate, string obj, bool isLiteral = false);
        void AssertNode(INode subject, INode predicate, INode obj);
        void AssertNode(string subject, string predicate, INode obj);
        INode CreateLiteralNode(string literal, Uri dataType);
        INode CreateLiteralNode(string literal);
        string BuildIri(string prefix, string suffix, string midFix = "");
    }
}
