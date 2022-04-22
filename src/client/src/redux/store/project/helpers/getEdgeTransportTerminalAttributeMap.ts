import { Edge } from "../../../../models";

export const getEdgeTransportTerminalAttributeMap = (edges: Edge[]) => {
  const map: { [attributeId: string]: { transportId: string; terminalId: string } } = {};

  edges.forEach((e) => {
    e.transport?.inputTerminal?.attributes?.forEach((a) => {
      map[a.id] = { transportId: e.transport.id, terminalId: e.transport.inputTerminal.id };
    });
    e.transport?.outputTerminal?.attributes?.forEach((a) => {
      map[a.id] = { transportId: e.transport.id, terminalId: e.transport.outputTerminal.id };
    });
  });

  return map;
};
