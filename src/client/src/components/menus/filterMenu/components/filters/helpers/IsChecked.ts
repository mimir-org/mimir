import { Edge } from "@mimirorg/modelbuilder-types";

export const AllRelationsChecked = (edges: Edge[]) => {
  return false; // !edges.some((e) => e.hidden && (IsLocationRelation(e.fromConnector) || IsProductRelation(e.fromConnector)));
};

export const AllPartOfChecked = (edges: Edge[]) => {
  return false; //!edges.some((e) => e.hidden && IsPartOfRelation(e.fromConnector));
};

export const AllTransportsChecked = (edges: Edge[]) => {
  return false; // !edges.some((e) => e.hidden && IsTransport(e.fromConnector));
};

export const IsTerminalTypeChecked = (edges: Edge[], terminalCategoryId: string, terminalTypeId: string) => {
  return false;
  // return !edges.some(
  //   (e) =>
  //     e.hidden &&
  //     e.fromConnector.terminalCategory === terminalCategoryId &&
  //     e.fromConnector.terminalTypeId === terminalTypeId &&
  //     IsTransport(e.fromConnector)
  // );
};

export const IsTerminalCategoryChecked = (edges: Edge[], terminalCategoryId: string) => {
  return false; // !edges.some((e) => e.hidden && e.fromConnector.terminalCategory === terminalCategoryId && IsTransport(e.fromConnector));
};

// TODO: fix
