import { TerminalType, TERMINAL_TYPE } from "../../../models/project";

const GetTransportTypeColor = (terminalType: TerminalType): string => {
    switch (terminalType) {
        case TERMINAL_TYPE.NotSet:
        case TERMINAL_TYPE.Electric:
        case TERMINAL_TYPE.Thermal:
        case TERMINAL_TYPE.Solar:
        case TERMINAL_TYPE.Mechanical:
        case TERMINAL_TYPE.Sound:
        case TERMINAL_TYPE.Wind:
        case TERMINAL_TYPE.HydroPower:
        case TERMINAL_TYPE.Fluid:
        case TERMINAL_TYPE.DryGranulated:
        case TERMINAL_TYPE.SolidPieces:
        case TERMINAL_TYPE.Bracket:
        case TERMINAL_TYPE.Bolts:
        case TERMINAL_TYPE.Flanges:
        case TERMINAL_TYPE.Sensor:
        case TERMINAL_TYPE.Water:
        case TERMINAL_TYPE.ChemicalFluids:
        case TERMINAL_TYPE.MultiphaseFluids:
        case TERMINAL_TYPE.WetGas:
        case TERMINAL_TYPE.Vapour:
        case TERMINAL_TYPE.Sand:
        case TERMINAL_TYPE.Powder:
        case TERMINAL_TYPE.Bricks:
        case TERMINAL_TYPE.Boxes:
        case TERMINAL_TYPE.Pieces:
            return "#b1b1b7";
        case TERMINAL_TYPE.Oil:
            return "#C05046";
        case TERMINAL_TYPE.Gas:
            return "#F59D56";
        default:
            return "#b1b1b7";
    }
};

export default GetTransportTypeColor;
