import { Edge } from "@mimirorg/modelbuilder-types";

export const getEdgeInterfaceTerminalAttributeMap = (edges: Edge[]) => {
  const map: { [attributeId: string]: { interfaceId: string; terminalId: string } } = {};

  edges.forEach((e) => {
    e.interface?.inputTerminal?.attributes?.forEach((a) => {
      map[a.id] = { interfaceId: e.interface.id, terminalId: e.interface.inputTerminal.id };
    });
    e.interface?.outputTerminal?.attributes?.forEach((a) => {
      map[a.id] = { interfaceId: e.interface.id, terminalId: e.interface.outputTerminal.id };
    });
  });

  return map;
};
