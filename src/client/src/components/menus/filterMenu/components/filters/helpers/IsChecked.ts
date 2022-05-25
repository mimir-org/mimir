import { Edge } from "../../../../../../models";
import { IsLocationTerminal, IsPartOfTerminal, IsProductTerminal, IsTransport } from "../../../../../flow/helpers/Connectors";

export const AllRelationsChecked = (edges: Edge[]) => {
  return !edges.some((e) => e.hidden && (IsLocationTerminal(e.fromConnector) || IsProductTerminal(e.fromConnector)));
};

export const AllPartOfChecked = (edges: Edge[]) => {
  return !edges.some((e) => e.hidden && IsPartOfTerminal(e.fromConnector));
};

export const AllTransportsChecked = (edges: Edge[]) => {
  return !edges.some((e) => e.hidden && IsTransport(e.fromConnector));
};

export const IsTerminalTypeChecked = (edges: Edge[], terminalCategoryId: string, terminalTypeId: string) => {
  return !edges.some(
    (e) =>
      e.hidden &&
      e.fromConnector.terminalCategory === terminalCategoryId &&
      e.fromConnector.terminalTypeId === terminalTypeId &&
      IsTransport(e.fromConnector)
  );
};

export const IsTerminalCategoryChecked = (edges: Edge[], terminalCategoryId: string) => {
  return !edges.some((e) => e.hidden && e.fromConnector.terminalCategory === terminalCategoryId && IsTransport(e.fromConnector));
};
