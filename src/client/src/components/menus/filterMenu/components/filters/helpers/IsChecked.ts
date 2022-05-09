import { Edge } from "../../../../../../models";
import { IsLocationTerminal, IsPartOf, IsProductTerminal, IsTransport } from "../../../../../flow/helpers";

export const AllRelationsChecked = (edges: Edge[]) => {
  return !edges.some((x) => x.isHidden && (IsLocationTerminal(x.fromConnector) || IsProductTerminal(x.fromConnector)));
};

export const AllPartOfChecked = (edges: Edge[]) => {
  return !edges.some((x) => x.isHidden && IsPartOf(x.fromConnector));
};

export const AllTransportsChecked = (edges: Edge[]) => {
  return !edges.some((x) => x.isHidden && IsTransport(x.fromConnector));
};

export const IsTerminalTypeChecked = (edges: Edge[], terminalCategoryId: string, terminalTypeId: string) => {
  return !edges.some(
    (x) =>
      x.isHidden &&
      x.fromConnector.terminalCategory === terminalCategoryId &&
      x.fromConnector.terminalTypeId === terminalTypeId &&
      IsTransport(x.fromConnector)
  );
};

export const IsTerminalCategoryChecked = (edges: Edge[], terminalCategoryId: string) => {
  return !edges.some(
    (x) => x.isHidden && x.fromConnector.terminalCategory === terminalCategoryId && IsTransport(x.fromConnector)
  );
};
