import { Edge } from "../../../../../../models";
import { IsLocationTerminal, IsPartOfTerminal, IsProductTerminal, IsTransport } from "../../../../../flow/helpers/Connectors";

export const AllRelationsChecked = (edges: Edge[]) => {
  return !edges.some((x) => x.hidden && (IsLocationTerminal(x.fromConnector) || IsProductTerminal(x.fromConnector)));
};

export const AllPartOfChecked = (edges: Edge[]) => {
  return !edges.some((x) => x.hidden && IsPartOfTerminal(x.fromConnector));
};

export const AllTransportsChecked = (edges: Edge[]) => {
  return !edges.some((x) => x.hidden && IsTransport(x.fromConnector));
};

export const IsTerminalTypeChecked = (edges: Edge[], terminalCategoryId: string, terminalTypeId: string) => {
  return !edges.some(
    (x) =>
      x.hidden &&
      x.fromConnector.terminalCategoryId === terminalCategoryId &&
      x.fromConnector.terminalTypeId === terminalTypeId &&
      IsTransport(x.fromConnector)
  );
};

export const IsTerminalCategoryChecked = (edges: Edge[], terminalCategoryId: string) => {
  return !edges.some(
    (x) => x.hidden && x.fromConnector.terminalCategoryId === terminalCategoryId && IsTransport(x.fromConnector)
  );
};
