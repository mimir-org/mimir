import { TerminalType } from "../../../../models";

const GetTransportTypeColor = (terminal: TerminalType): string => {
  switch (terminal) {
    case TERMINAL.NotSet:
    case TERMINAL.Electric:
    case TERMINAL.Thermal:
    case TERMINAL.Solar:
    case TERMINAL.Mechanical:
    case TERMINAL.Sound:
    case TERMINAL.Wind:
    case TERMINAL.HydroPower:
    case TERMINAL.Fluid:
    case TERMINAL.DryGranulated:
    case TERMINAL.SolidPieces:
    case TERMINAL.Bracket:
    case TERMINAL.Bolts:
    case TERMINAL.Flanges:
    case TERMINAL.Sensor:
    case TERMINAL.Water:
    case TERMINAL.ChemicalFluids:
    case TERMINAL.MultiphaseFluids:
    case TERMINAL.WetGas:
    case TERMINAL.Vapour:
    case TERMINAL.Sand:
    case TERMINAL.Powder:
    case TERMINAL.Bricks:
    case TERMINAL.Boxes:
    case TERMINAL.Pieces:
      return "#b1b1b7";
    case TERMINAL.Oil:
      return "#C05046";
    case TERMINAL.Gas:
      return "#F59D56";
    default:
      return "#b1b1b7";
  }
};

export default GetTransportTypeColor;
