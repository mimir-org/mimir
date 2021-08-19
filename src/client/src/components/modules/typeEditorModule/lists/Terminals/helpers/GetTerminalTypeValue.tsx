import {
  TerminalTypeItem,
  TypeMode,
  ConnectorType,
} from "../../../../../../models";
import { ModeNew, ModeEdit } from "../../../helpers";

const GetTerminalTypeValue = (
  mode: TypeMode,
  type: string,
  terminal?: TerminalTypeItem,
  terminals?: any[]
) => {
  let terminalName = "";
  ModeEdit(mode) &&
    terminals &&
    terminals.forEach((t) => {
      if (t.id === terminal.terminalTypeId) {
        terminalName = t.name;
        return terminalName;
      }
    });

  if (ModeNew(mode)) {
    if (type === "number") {
      return 0;
    } else if (type === "terminaltype") {
      return "";
    } else if (type === "terminalId") {
      return "";
    } else if (type === "direction") {
      return 2;
    } else if (type === "directionName") {
      return "Direction";
    }
  } else if (ModeEdit(mode)) {
    if (type === "number") {
      return terminal.number;
    } else if (type === "terminaltype") {
      return terminalName;
    } else if (type === "terminalId") {
      return terminal.terminalTypeId;
    } else if (type === "direction") {
      return terminal.connectorType;
    } else if (type === "directionName") {
      return ConnectorType[terminal.connectorType];
    }
  }
};

export default GetTerminalTypeValue;
