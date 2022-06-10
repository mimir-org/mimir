import { Edge } from "@mimirorg/modelbuilder-types";
import { IsLocationRelation, IsPartOfRelation, IsProductRelation, IsTerminal } from "../../../../../flow/helpers/Connectors";

export const AllRelationsChecked = (edges: Edge[]) => {
  return !edges.some((e) => e.hidden && (IsLocationRelation(e.fromConnector) || IsProductRelation(e.fromConnector)));
};

export const AllPartOfChecked = (edges: Edge[]) => {
  return !edges.some((e) => e.hidden && IsPartOfRelation(e.fromConnector));
};

export const AllTransportsChecked = (edges: Edge[]) => {
  return !edges.some((e) => e.hidden && IsTerminal(e.fromConnector));
};

export const IsTerminalTypeChecked = (edges: Edge[], terminalCategoryId: string, terminalTypeId: string) => {
  return !edges.some(
    (e) =>
      e.hidden &&
      // e.fromConnector.terminalCategory === terminalCategoryId &&
      // e.fromConnector.terminalTypeId === terminalTypeId &&
      IsTerminal(e.fromConnector)
  );
};

export const IsTerminalCategoryChecked = (edges: Edge[], terminalCategoryId: string) => {
  return !edges.some((e) => e.hidden && IsTerminal(e.fromConnector)); // && e.fromConnector.terminalCategory === terminalCategoryId
};

// TODO: fix
