import { Project, Node, Edge, Composite, Transport, Interface, Connector } from "../../../models";

/**
 * Calls constructor on project structure, ensuring that default values like 'kind' are initialized.
 * @param project Project to initialize
 * @returns Project
 */
export const InitializeProject = (project: Project): Project => {
  project.nodes = project.nodes.map((node) => {
    let initNode = new Node(node);

    if (initNode.composites.length > 0) {
      initNode.composites = initNode.composites.map((composite) => new Composite(composite));
    }

    if (initNode.connectors.length > 0) {
      initNode.connectors = initNode.connectors.map((connector) => new Connector(connector));
    }

    return initNode;
  });
  project.edges = project.edges.map((edge) => {
    let initEdge = new Edge(edge);

    if (initEdge.transport) {
      initEdge.transport = new Transport(initEdge.transport);
      initEdge.transport.inputTerminal = new Connector(initEdge.transport.inputTerminal);
      initEdge.transport.outputTerminal = new Connector(initEdge.transport.outputTerminal);
    }

    if (initEdge.interface) {
      initEdge.interface = new Interface(initEdge.interface);
      initEdge.interface.inputTerminal = new Connector(initEdge.transport.inputTerminal);
      initEdge.interface.outputTerminal = new Connector(initEdge.transport.outputTerminal);
    }

    return initEdge;
  });

  return project;
};
