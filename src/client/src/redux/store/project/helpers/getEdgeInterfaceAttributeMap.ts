import { Edge } from "../../../../models";

export const getEdgeInterfaceAttributeMap = (edges: Edge[]) => {
  const map: { [attributeId: string]: { interfaceId: string } } = {};

  edges.forEach((e) =>
    e.interface?.attributes?.forEach((a) => {
      map[a.id] = { interfaceId: e.interface.id };
    })
  );

  return map;
};
