using System;
using System.Collections.Generic;
using System.Linq;
using Mb.Core.Repositories.Contracts;
using Mb.Models.Configurations;
using Mb.Models.Data;
using Mb.Models.Enums;
using Microsoft.Extensions.Options;

namespace Mb.Core.Repositories
{
    public class CommonRepository : ICommonRepository
    {
        private readonly ModelBuilderConfiguration _modelBuilderConfiguration;
        private List<TerminalColor> _terminalData;

        public CommonRepository(IOptions<ModelBuilderConfiguration> modelBuilderConfiguration)
        {
            _modelBuilderConfiguration = modelBuilderConfiguration?.Value;


            InitialColors();
        }

        public string CreateUniqueId()
        {
            return $"{_modelBuilderConfiguration.Domain}_{Guid.NewGuid()}";
        }

        public IEnumerable<TerminalColor> GetTerminalColors()
        {
            return _terminalData;
        }

        public TerminalColor GetTerminalColor(Terminal terminal, TerminalCategory category, RelationType relationType, NodeType nodeType)
        {
            if (relationType == RelationType.Transport)
            {
                var match = _terminalData.FirstOrDefault(x => x.Terminal == terminal && x.Category == category);
                return match ?? _terminalData.FirstOrDefault(x =>
                    x.Terminal == Terminal.NotSet && x.Category == TerminalCategory.NotSet);
            }
            if (relationType == RelationType.PartOf)
            {
                return nodeType switch
                {
                    NodeType.Function or NodeType.AspectFunction => new TerminalColor { Terminal = terminal, Category = category, Color = "#FFC000" },
                    NodeType.Product or NodeType.AspectProduct => new TerminalColor { Terminal = terminal, Category = category, Color = "#00F0FF" },
                    NodeType.AspectLocation or NodeType.Location => new TerminalColor { Terminal = terminal, Category = category, Color = "#FA00FF" },
                    NodeType.NotSet => new TerminalColor { Terminal = terminal, Category = category, Color = "#555555" },
                    _ => throw new ArgumentOutOfRangeException(nameof(nodeType), nodeType, null),
                };
            }

            return _terminalData.FirstOrDefault(x => x.Terminal == Terminal.NotSet && x.Category == TerminalCategory.NotSet);
        }

        public TerminalCategory GetCategory(Terminal terminal)
        {
            var match = _terminalData.FirstOrDefault(x => x.Terminal == terminal);
            return match?.Category ?? TerminalCategory.NotSet;
        }

        #region MyRegion

        private void InitialColors()
        {
            _terminalData = new List<TerminalColor>();

            // Default
            _terminalData.Add(new TerminalColor
            {
                Terminal = Terminal.NotSet,
                Category = TerminalCategory.NotSet,
                Color = "#555555"
            });

            // Transport
            _terminalData.Add(new TerminalColor
            {
                Terminal = Terminal.NotSet,
                Category = TerminalCategory.MaterialFluid,
                Color = "#0066FF"
            });
            _terminalData.Add(new TerminalColor
            {
                Terminal = Terminal.NotSet,
                Category = TerminalCategory.MaterialGranulate,
                Color = "#CC9900"
            });
            _terminalData.Add(new TerminalColor
            {
                Terminal = Terminal.NotSet,
                Category = TerminalCategory.MaterialPieces,
                Color = "#663300"
            });
            _terminalData.Add(new TerminalColor
            {
                Terminal = Terminal.NotSet,
                Category = TerminalCategory.EnergyElectrical,
                Color = "#FF0000"
            });
            _terminalData.Add(new TerminalColor
            {
                Terminal = Terminal.NotSet,
                Category = TerminalCategory.EnergyThermal,
                Color = "#FF9900"
            });
            _terminalData.Add(new TerminalColor
            {
                Terminal = Terminal.NotSet,
                Category = TerminalCategory.EnergyMechanical,
                Color = "#CCCCCC"
            });
            _terminalData.Add(new TerminalColor
            {
                Terminal = Terminal.NotSet,
                Category = TerminalCategory.Information,
                Color = "#006600"
            });
            _terminalData.Add(new TerminalColor
            {
                Terminal = Terminal.NotSet,
                Category = TerminalCategory.Force,
                Color = "#000000"
            });

            // Media (Material Fluids)
            _terminalData.Add(new TerminalColor
            {
                Terminal = Terminal.Condensate,
                Category = TerminalCategory.MaterialFluid,
                Color = "#990000"
            });

            _terminalData.Add(new TerminalColor
            {
                Terminal = Terminal.Oil,
                Category = TerminalCategory.MaterialFluid,
                Color = "#663300"
            });

            _terminalData.Add(new TerminalColor
            {
                Terminal = Terminal.WetGas,
                Category = TerminalCategory.MaterialFluid,
                Color = "#FF9900"
            });
            _terminalData.Add(new TerminalColor
            {
                Terminal = Terminal.Gas,
                Category = TerminalCategory.MaterialFluid,
                Color = "#FFCC00"
            });
            _terminalData.Add(new TerminalColor
            {
                Terminal = Terminal.HotSeawater,
                Category = TerminalCategory.MaterialFluid,
                Color = "#99CC66"
            });
            _terminalData.Add(new TerminalColor
            {
                Terminal = Terminal.OilyWater,
                Category = TerminalCategory.MaterialFluid,
                Color = "#00CC66"
            });
            _terminalData.Add(new TerminalColor
            {
                Terminal = Terminal.ProducedWater,
                Category = TerminalCategory.MaterialFluid,
                Color = "#006600"
            });
            _terminalData.Add(new TerminalColor
            {
                Terminal = Terminal.Seawater,
                Category = TerminalCategory.MaterialFluid,
                Color = "#33CCCC"
            });
            _terminalData.Add(new TerminalColor
            {
                Terminal = Terminal.Water,
                Category = TerminalCategory.MaterialFluid,
                Color = "#33CCCC"
            });
            _terminalData.Add(new TerminalColor
            {
                Terminal = Terminal.CoolingMedium,
                Category = TerminalCategory.MaterialFluid,
                Color = "#333399"
            });
            _terminalData.Add(new TerminalColor
            {
                Terminal = Terminal.GlycolMegTeg,
                Category = TerminalCategory.MaterialFluid,
                Color = "#996699"
            });
            _terminalData.Add(new TerminalColor
            {
                Terminal = Terminal.Methanol,
                Category = TerminalCategory.MaterialFluid,
                Color = "#666699"
            });
            _terminalData.Add(new TerminalColor
            {
                Terminal = Terminal.Chemical,
                Category = TerminalCategory.MaterialFluid,
                Color = "#FF99CC"
            });
            _terminalData.Add(new TerminalColor
            {
                Terminal = Terminal.Multiphase,
                Category = TerminalCategory.MaterialFluid,
                Color = "#663300"
            });

            // Media (Material Granulate)
            _terminalData.Add(new TerminalColor
            {
                Terminal = Terminal.Powder,
                Category = TerminalCategory.MaterialGranulate,
                Color = "#CC9900"
            });

            // Media (Material Pieces)

            // Media (Energy Electrical)

            // Media (Energy Thermal)

            // Media (Energy Mechanical)

            // Media (Information)

            // Media (Force)
        }

        #endregion
    }
}
