using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Mb.Core.Repositories.Contracts;
using Mb.Models;
using Mb.Models.Enums;

namespace Mb.Core.Repositories
{
    public class LibraryRepository : ILibraryRepository
    {
        private readonly ILibraryTypeComponentRepository _libraryTypeComponentRepository;
        private readonly IMapper _mapper;
        private readonly IGenerateIdRepository _generateIdRepository;

        public LibraryRepository(ILibraryTypeComponentRepository libraryTypeComponentRepository, IMapper mapper, IGenerateIdRepository generateIdRepository)
        {
            _libraryTypeComponentRepository = libraryTypeComponentRepository;
            _mapper = mapper;
            _generateIdRepository = generateIdRepository;
        }

        public IEnumerable<LibNode> GetAll(string searchString)
        {
            List<LibraryTypeComponent> libraryTypeComponents;

            var data = _libraryTypeComponentRepository.GetAll();
            libraryTypeComponents = string.IsNullOrEmpty(searchString) ? 
                _libraryTypeComponentRepository.GetAll().OrderBy(x => x.TypeName).Take(30).ToList() : 
                _libraryTypeComponentRepository.GetAll().OrderBy(x => x.TypeName).Where(x => x.TypeName.ToLower().Contains(searchString.ToLower())).Take(30).ToList();

            return ConvertToLibNode(libraryTypeComponents);
        }

        private IEnumerable<LibNode> ConvertToLibNode(IEnumerable<LibraryTypeComponent> types)
        {
            foreach (var libraryTypeComponent in types)
            {
                libraryTypeComponent.CreateFromJsonData();
                var mappedNode = _mapper.Map<LibNode>(libraryTypeComponent);
                mappedNode.Connectors.Add(CreateRelationConnector(RelationType.PartOf, ConnectorType.Input, libraryTypeComponent.Version));
                mappedNode.Connectors.Add(CreateRelationConnector(RelationType.PartOf, ConnectorType.Output, libraryTypeComponent.Version));
                mappedNode.Connectors.Add(CreateRelationConnector(RelationType.Relation, ConnectorType.Input, libraryTypeComponent.Version));
                mappedNode.Connectors.Add(CreateRelationConnector(RelationType.Relation, ConnectorType.Output, libraryTypeComponent.Version));

                yield return mappedNode;
            }
        }

        private Connector CreateRelationConnector(RelationType relationType, ConnectorType connectorType, string version)
        {
            return new Connector
            {
                Id = _generateIdRepository.CreateUniqueId(version, "c"),
                Name = "WellFluid",
                Type = connectorType,
                TerminalCategory = TerminalCategory.NotSet,
                RelationType = relationType,
                TerminalType = TerminalType.NotSet,
                NodeId = null,
                Node = null
            };
        }

        private static IEnumerable<LibNode> GenerateTestNodes()
        {
            var seperatorNode = new LibNode
            {
                Id = "123",
                Name = "Separation System (20)",
                Category = "Main Process Systems",
                Icon = IconType.FunctionIcon,
                Label = "Separation System (20)",
                Type = NodeType.Function,
                Connectors = new List<Connector>
                {
                    new Connector
                    {
                        Id = "SS20_123",
                        Name = "WellFluid",
                        NodeId = "",
                        Type = ConnectorType.Input,
                        RelationType = RelationType.Transport,
                        TerminalType = TerminalType.Fluid,
                        TerminalCategory = TerminalCategory.MaterialFlow
                    },
                    new Connector
                    {
                        Id = "SS20_1234",
                        Name = "Gas",
                        NodeId = "",
                        Type = ConnectorType.Output,
                        RelationType = RelationType.Transport,
                        TerminalType = TerminalType.Gas,
                        TerminalCategory = TerminalCategory.MaterialFlow
                    },
                    new Connector
                    {
                        Id = "SS20_12345",
                        Name = "Oil",
                        NodeId = "",
                        Type = ConnectorType.Output,
                        RelationType = RelationType.Transport,
                        TerminalType = TerminalType.Oil,
                        TerminalCategory = TerminalCategory.MaterialFlow
                    },
                    new Connector
                    {
                        Id = "C02AD125-8619-4C8C-841D-FBED1588F6A4",
                        Name = "",
                        NodeId = "",
                        Type = ConnectorType.Input,
                        RelationType = RelationType.PartOf,
                        TerminalType = TerminalType.NotSet,
                        TerminalCategory = TerminalCategory.NotSet
                    },
                    new Connector
                    {
                        Id = "16B36F07-2885-4DB6-AAF7-A3122B740EB4",
                        Name = "",
                        NodeId = "",
                        Type = ConnectorType.Output,
                        RelationType = RelationType.PartOf,
                        TerminalType = TerminalType.NotSet,
                        TerminalCategory = TerminalCategory.NotSet
                    },
                    new Connector
                    {
                        Id = "31A53D61-0D3F-4CA8-A693-C797CDA5F89D",
                        Name = "",
                        NodeId = "",
                        Type = ConnectorType.Output,
                        RelationType = RelationType.Relation,
                        TerminalType = TerminalType.NotSet,
                        TerminalCategory = TerminalCategory.NotSet
                    }

                },
                Attributes = new List<Attribute>
                {
                    new Attribute
                    {
                        NodeId = "",
                        Key = "ID",
                        Value = "=KC2"
                    }
                }
            };

            yield return seperatorNode;

            var productNode = new LibNode
            {
                Id = "789",
                Name = "SQ Motor",
                Category = "Motors",
                Icon = IconType.ProductIcon,
                Label = "IC411 SQ Motor",
                Type = NodeType.Product,
                Connectors = new List<Connector>
                {
                    new Connector
                    {
                        Id = "6BB587DF-6FCF-4C75-B16B-6E7FAEF936ED",
                        Name = "",
                        NodeId = "",
                        Type = ConnectorType.Input,
                        RelationType = RelationType.PartOf,
                        TerminalType = TerminalType.NotSet,
                        TerminalCategory = TerminalCategory.NotSet
                    },
                    new Connector
                    {
                        Id = "AB15C15A-079C-4D07-808D-20948D209872",
                        Name = "",
                        NodeId = "",
                        Type = ConnectorType.Output,
                        RelationType = RelationType.PartOf,
                        TerminalType = TerminalType.NotSet,
                        TerminalCategory = TerminalCategory.NotSet
                    },
                    new Connector
                    {
                        Id = "547B96ED-0A77-465F-9F9C-18E9876CA1FE",
                        Name = "",
                        NodeId = "",
                        Type = ConnectorType.Input,
                        RelationType = RelationType.Relation,
                        TerminalType = TerminalType.NotSet,
                        TerminalCategory = TerminalCategory.NotSet
                    },
                    new Connector
                    {
                        Id = "0600DC82-3103-426A-B0C0-F8C35BAA46FF",
                        Name = "",
                        NodeId = "",
                        Type = ConnectorType.Output,
                        RelationType = RelationType.Relation,
                        TerminalType = TerminalType.NotSet,
                        TerminalCategory = TerminalCategory.NotSet
                    }

                },
                Attributes = new List<Attribute>
                {
                    new Attribute
                    {
                        NodeId = "",
                        Key = "ID",
                        Value = "-KC1"
                    },
                    new Attribute
                    {
                        NodeId = "",
                        Key = "Semantic ID",
                        Value = "http://vg.no"
                    }
                }
            };

            yield return productNode;

            var noakaLocationNode = new LibNode
            {
                Id = "458",
                Name = "Noaka Field",
                Category = "Field Location",
                Icon = IconType.LocationIcon,
                Label = "Noaka Field",
                Type = NodeType.Location,
                Connectors = new List<Connector>
                {
                    new Connector
                    {
                        Id = "1D01DE66-C5DE-4D62-8645-1B041B673735",
                        Name = "",
                        NodeId = "",
                        Type = ConnectorType.Input,
                        RelationType = RelationType.Relation,
                        TerminalType = TerminalType.NotSet,
                        TerminalCategory = TerminalCategory.NotSet
                    },
                    new Connector
                    {
                        Id = "7D14C392-62AF-4A78-8A3B-D73937811241",
                        Name = "",
                        NodeId = "",
                        Type = ConnectorType.Input,
                        RelationType = RelationType.PartOf,
                        TerminalType = TerminalType.NotSet,
                        TerminalCategory = TerminalCategory.NotSet
                    },
                    new Connector
                    {
                        Id = "D7D0EDB1-09C3-4A6E-AF1A-5243821C0347",
                        Name = "",
                        NodeId = "",
                        Type = ConnectorType.Output,
                        RelationType = RelationType.PartOf,
                        TerminalType = TerminalType.NotSet,
                        TerminalCategory = TerminalCategory.NotSet
                    }

                },
                Attributes = new List<Attribute>
                {
                    new Attribute
                    {
                        NodeId = "",
                        Key = "ID",
                        Value = "=KC2"
                    }
                }
            };

            yield return noakaLocationNode;
        }
    }
}
