import { Edge } from "../../../../models";

export const getEdgeTransportAttributeMap = (edges: Edge[]) => {
  const map: { [attributeId: string]: { transportId: string } } = {};

  edges.forEach((e) =>
    e.transport?.attributes?.forEach((a) => {
      map[a.id] = { transportId: e.transport.id };
    })
  );

  return map;
};
