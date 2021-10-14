import { Edge } from "../../../../models";

export const FindEdgeForTransport = (edges: Edge[], transportId: string): Edge => {
  return edges.find((e) => e.transportId === transportId);
};

export const FindEdgeForInterface = (edges: Edge[], interfaceId: string): Edge => {
  return edges.find((e) => e.interfaceId === interfaceId);
};
