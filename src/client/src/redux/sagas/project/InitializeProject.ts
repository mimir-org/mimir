import { IsTransport } from "../../../components/flow/helpers";
import { Project, Node, Edge, Composite, Transport, Interface, Connector, Attribute } from "../../../models";

/**
 * Calls constructor on project structure, ensuring that default values like 'kind' are initialized.
 * @param project Project to initialize
 * @returns Project
 */
export const InitializeProject = (project: Project): Project => {
  project.nodes = project.nodes.map((node) => {
    let initNode = new Node(node);

    initAttributes(initNode);

    if (initNode.composites.length > 0) {
      initNode.composites = initNode.composites.map((composite) => initAttributes(composite) && new Composite(composite));
    }

    if (initNode.connectors.length > 0) {
      initNode.connectors = initNode.connectors.map((connector) => {
        if (IsTransport(connector)) {
          initAttributes(connector);
        }
        return new Connector(connector);
      });
    }

    return initNode;
  });
  project.edges = project.edges.map((edge) => {
    let initEdge = new Edge(edge);

    if (initEdge.transport) {
      initEdge.transport = initAttributes(initEdge.transport) && new Transport(initEdge.transport);
      initEdge.transport.inputTerminal =
        initAttributes(initEdge.transport.inputTerminal) && new Connector(initEdge.transport.inputTerminal);
      initEdge.transport.outputTerminal =
        initAttributes(initEdge.transport.outputTerminal) && new Connector(initEdge.transport.outputTerminal);
    }

    if (initEdge.interface) {
      initEdge.interface = new Interface(initEdge.interface);
      initEdge.interface.inputTerminal =
        initAttributes(initEdge.interface.inputTerminal) && new Connector(initEdge.interface.inputTerminal);
      initEdge.interface.outputTerminal =
        initAttributes(initEdge.interface.outputTerminal) && new Connector(initEdge.interface.outputTerminal);
    }

    return initEdge;
  });

  return project;
};

interface HasAttributes {
  attributes: Attribute[];
}

const initAttributes = <T extends HasAttributes>(element: T): T => {
  element.attributes = element.attributes.map((attr) => new Attribute(attr));
  return element;
};
