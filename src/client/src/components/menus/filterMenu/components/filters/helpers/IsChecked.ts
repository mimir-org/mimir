import { Edge } from "@mimirorg/modelbuilder-types";
import { IsTerminal } from "../../../../../../services";
import { IsLocationRelation, IsPartOfRelation, IsProductRelation } from "../../../../../flow/helpers/Connectors";

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
      e.fromConnector.terminalParentTypeName === terminalCategory &&
      e.fromConnector.terminalTypeId === terminalTypeId
  );
};

export const IsTerminalCategoryChecked = (edges: Edge[], terminalParentTypeName: string) => {
  return !edges.some(
    (e) => e.hidden && IsTerminal(e.fromConnector) && e.fromConnector.terminalParentTypeName === terminalParentTypeName
  );
};
