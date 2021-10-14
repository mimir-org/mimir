import { Project, Node, Edge, Composite, Transport, Interface } from "../../../models";

export const InitializeProject = (project: Project): Project => {
  project.nodes = project.nodes.map((node) => {
    let initNode = new Node(node);

    if (initNode.composites.length > 0) {
      initNode.composites = initNode.composites.map((composite) => new Composite(composite));
    }

    return initNode;
  });
  project.edges = project.edges.map((edge) => {
    let initEdge = new Edge(edge);

    if (initEdge.transport) {
      initEdge.transport = new Transport(initEdge.transport);
    }

    if (initEdge.interface) {
      initEdge.interface = new Interface(initEdge.interface);
    }

    return initEdge;
  });

  return project;
};
