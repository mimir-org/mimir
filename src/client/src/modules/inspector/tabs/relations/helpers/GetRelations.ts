import { Connector, Edge } from "../../../../../models";

const GetRelations = (
  connectors: Connector[],
  edges: Edge[]
): [Connector[], Map<string, Edge>] => {
  const relations: Connector[] = [];
  const relationEdges: Map<string, Edge> = new Map();

  for (let connector of connectors) {
    let edge: Edge;

    if (
      connector.relationType &&
      (edge = edges.find(
        (e) =>
          e.fromConnector.id === connector.id ||
          e.toConnector.id === connector.id
      ))
    ) {
      relations.push(connector);
      relationEdges.set(connector.id, edge);
    }
  }

  relations.sort((a, b) =>
    a.relationType === b.relationType
      ? a.type - b.type
      : a.relationType - b.relationType
  );

  return [relations, relationEdges];
};

export { GetRelations };
