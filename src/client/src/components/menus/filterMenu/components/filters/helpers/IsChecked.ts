import { Edge } from "@mimirorg/modelbuilder-types";
import { IsLocationRelation, IsPartOfRelation, IsProductRelation, IsTerminal } from "../../../../../flow/helpers/Connectors";

export const AreAllProductAndLocationChecked = (edges: Edge[]) => {
  return !edges.some((e) => e.hidden && (IsProductRelation(e.fromConnector) || IsLocationRelation(e.fromConnector)));
};

export const AreAllPartOfChecked = (edges: Edge[]) => {
  return !edges.some((e) => e.hidden && IsPartOfRelation(e.fromConnector));
};

export const AreAllTransportsChecked = (edges: Edge[]) => {
  return !edges.some((e) => e.hidden && IsTerminal(e.fromConnector));
};

export const IsTerminalTypeChecked = (edges: Edge[], terminalCategory: string, terminalTypeId: string) => {
  return !edges.some(
    (e) =>
      e.hidden &&
      IsTerminal(e.fromConnector) &&
      e.fromConnector.terminalCategory === terminalCategory &&
      e.fromConnector.terminalTypeId === terminalTypeId
  );
};

export const IsTerminalCategoryChecked = (edges: Edge[], terminalCategory: string) => {
  return !edges.some((e) => e.hidden && IsTerminal(e.fromConnector) && e.fromConnector.terminalCategory === terminalCategory);
};
