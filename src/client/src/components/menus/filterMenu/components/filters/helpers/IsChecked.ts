import { Edge } from "../../../../../../models";
import {
  IsLocationTerminal,
  IsPartOfTerminal,
  IsProductTerminal,
  IsTransport,
} from "../../../../../flow/helpers/CheckConnectorTypes";

export const AllRelationsChecked = (edges: Edge[]) => {
  return !edges.some((x) => x.isHidden && (IsLocationTerminal(x.fromConnector) || IsProductTerminal(x.fromConnector)));
};

export const AllPartOfChecked = (edges: Edge[]) => {
  return !edges.some((x) => x.isHidden && IsPartOfTerminal(x.fromConnector));
};

export const AllTransportsChecked = (edges: Edge[]) => {
  return !edges.some((x) => x.isHidden && IsTransport(x.fromConnector));
};

export const IsTerminalTypeChecked = (edges: Edge[], terminalCategoryId: string, terminalTypeId: string) => {
  return !edges.some(
    (x) =>
      x.isHidden &&
      x.fromConnector.terminalCategoryId === terminalCategoryId &&
      x.fromConnector.terminalTypeId === terminalTypeId &&
      IsTransport(x.fromConnector)
  );
};

export const IsTerminalCategoryChecked = (edges: Edge[], terminalCategoryId: string) => {
  return !edges.some(
    (x) => x.isHidden && x.fromConnector.terminalCategoryId === terminalCategoryId && IsTransport(x.fromConnector)
  );
};
