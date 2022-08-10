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

export const IsTerminalTypeChecked = (edges: Edge[], terminalCategory: string, terminalTypeId: string) => {
  return !edges.some(
    (e) =>
      e.hidden &&
      IsTerminal(e.fromConnector) &&
      e.fromConnector.terminalCategory === terminalCategory &&
      e.fromConnector.terminalTypeId === terminalTypeId
  );
};

export const IsTerminalCategoryChecked = (edges: Edge[], terminalCategoryId: string) => {
  return !edges.some((e) => e.hidden && IsTerminal(e.fromConnector) && e.fromConnector.terminalCategory === terminalCategoryId);
};
