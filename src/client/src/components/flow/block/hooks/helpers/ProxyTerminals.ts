import { Connector, ConnectorDirection, ConnectorVisibility, Terminal, Node, Edge, Project } from "@mimirorg/modelbuilder-types";
import { Dispatch } from "redux";
import { addTerminal, createEdge, deleteEdge, deleteTerminal, updateTerminal } from "../../../../../redux/store/project/actions";
import { CreateId } from "../../../helpers";
import { IsPartOfConnection, IsTerminal } from "../../../helpers/Connectors";
import { IsTerminalSiblings } from "../../helpers";

export enum TransportDirection {
  CoFlow = 0,
  CounterFlow = 1,
}

export enum ResolveType {
  Add = 0,
  Remove = 1,
}

export interface TransportDetection {
  fromNode: string;
  toNode: string;
  fromTerminal: string;
  toTerminal: string;
  level: number;
  isResolved: boolean;
  direction: TransportDirection;
  proxySibling: string;
  proxyParent: string;
  projectId: string;
  masterProjectId: string;
}

export interface DetectedEdge {
  edge: Edge;
  resolveType: ResolveType;
}

export const ResolveSubStreams = async (project: Project, dispatch: Dispatch, edgeToDelete: Edge, edgeToAdd: Edge) => {
  const projectCopy = { ...project };

  if (edgeToAdd != null) projectCopy.edges.push(edgeToAdd);

  if (edgeToDelete != null) {
    // TODO: We need to delete all objects that is not in the stream output

    projectCopy.edges = projectCopy.edges.filter((x) => x.id !== edgeToAdd.id);
  }

  let streams: DetectedEdge[] = [];

  // const rootFunctionNode = project.nodes.filter((x) => x.isRoot && x.aspect === Aspect.Function)[0];
  projectCopy.nodes.forEach((node) => {
    streams = streams.concat(ResolveDetectedEdgesRecursive(projectCopy, node));
  });

  console.log(streams);

  streams.forEach((stream) => {
    const currentEdge = projectCopy.edges.find(
      (x) => x.fromConnectorId === stream.edge.fromConnectorId && x.toConnectorId === stream.edge.toConnectorId
    );

    // console.log(currentEdge);

    if (stream.resolveType === ResolveType.Add && currentEdge == null) dispatch(createEdge(stream.edge));

    if (stream.resolveType === ResolveType.Remove && currentEdge != null) dispatch(deleteEdge(currentEdge.id));
  });
};

/**
 * Resolve detected edges recursive
 * @param project
 * @param rootNode
 */
export const ResolveDetectedEdgesRecursive = (project: Project, rootNode: Node): DetectedEdge[] => {
  let detectedEdges: DetectedEdge[] = [];
  const topNodeIds = project.edges
    .filter((x) => x.fromNodeId === rootNode?.id && IsPartOfConnection(x.fromConnector, x.toConnector))
    .map((x) => x.toNodeId);
  const topNodes = project.nodes.filter((x) => topNodeIds.some((y) => y == x.id));
  detectedEdges = detectedEdges.concat(ResolveTransportDetection(project, topNodes));
  return detectedEdges;
  // topNodes.forEach((node) => {
  //   ResolveDetectedEdgesRecursive(project, detectedEdges, node);
  //   console.log(node.label);
  //   console.log("Detected", detectedEdges);
  // });

  // detectedEdges = detectedEdges.concat(ResolveTransportDetection(project, topNodes));
};

/**
 * Resolve child transport streams when new edges is fulfilled.
 * @param project
 */
export const ResolveTransportDetection = (project: Project, topNodes: Node[]): DetectedEdge[] => {
  // TODO: Must also be implemented for other aspects

  let transportDetections: TransportDetection[] = [];
  const detectedEdges: DetectedEdge[] = [];

  if (topNodes == null || topNodes.length < 1) return detectedEdges;

  topNodes.forEach((n) => {
    const proxyConnectors = n.connectors.filter((x) => IsTerminal(x) && x.isProxy) as Terminal[];
    const transports = TransportDetection(proxyConnectors, project, n.id);
    transportDetections = transportDetections.concat(transports);
  });

  if (transportDetections == null || transportDetections.length < 1) return detectedEdges;

  transportDetections
    .filter((d) => d.proxySibling != null && d.direction === TransportDirection.CounterFlow)
    .forEach((td) => {
      const sibling = transportDetections.find((y) => y.fromTerminal === td.proxySibling);
      if (sibling != null) {
        const fromNode = project.nodes.find((node) => node.id === td.toNode);
        const toNode = project.nodes.find((node) => node.id === sibling.toNode);
        const fromConnector = fromNode.connectors.find((connector) => IsTerminal(connector) && connector.id === td.toTerminal);
        const toConnector = toNode.connectors.find((connector) => IsTerminal(connector) && connector.id === sibling.toTerminal);

        const edge: Edge = {
          id: CreateId(),
          iri: null,
          domain: null,
          kind: "Edge",
          fromConnectorId: td.toTerminal,
          fromConnectorIri: null,
          fromConnector: fromConnector as Terminal,
          toConnectorId: sibling.toTerminal,
          toConnectorIri: null,
          toConnector: toConnector as Terminal,
          fromNodeId: td.toNode,
          fromNodeIri: null,
          fromNode: fromNode,
          toNodeId: sibling.toNode,
          toNodeIri: null,
          toNode: toNode,
          transportId: null, // TODO: Resolve this
          transport: null, // TODO: Resolve this,
          interfaceId: null, // TODO: Resolve this
          interface: null, // TODO: Resolve this
          isLocked: false,
          isLockedStatusBy: null,
          isLockedStatusDate: null,
          masterProjectId: td.masterProjectId,
          masterProjectIri: null,
          projectId: td.projectId,
          projectIri: null,
          selected: false,
          hidden: false,
          blockHidden: false,
        };

        // console.log("LEVEL ", sibling.level === td.level);
        // console.log("SIBLING ", sibling.isResolved);
        // console.log("DETECTION ", td.isResolved);
        // console.log("MAIN STREAM ", HasMainStream(project, td.proxyParent, sibling.proxyParent));

        const resolveType: ResolveType =
          sibling.level === td.level &&
          sibling.isResolved &&
          td.isResolved &&
          HasMainStream(project, td.proxyParent, sibling.proxyParent)
            ? ResolveType.Add
            : ResolveType.Remove;

        const detectedEdge: DetectedEdge = {
          edge: edge,
          resolveType: resolveType,
        };

        detectedEdges.push(detectedEdge);
      }
    });

  return detectedEdges;
};

/**
 * Check if there is a main stream that matches terminal stream.
 * @param project
 * @param from
 * @param to
 */
export const HasMainStream = (project: Project, from: string, to: string): boolean => {
  const edge = project.edges.find((x) => x.fromConnectorId === from && x.toConnectorId === to);
  if (edge == null) return false;

  // if (edge.transport != null || edge.interface != null) return true;
  return true;

  return false;
};

/**
 * Create transport detection.
 * @param terminals
 * @param project
 * @param nodeId
 */
export const TransportDetection = (terminals: Terminal[], project: Project, nodeId: string): TransportDetection[] => {
  const detections: TransportDetection[] = [];

  terminals.forEach((x) => {
    const direction = project.edges.some((edge) => edge.toNodeId === nodeId && edge.toConnectorId === x.id)
      ? TransportDirection.CounterFlow
      : TransportDirection.CoFlow;
    const detection: TransportDetection = {
      fromNode: nodeId,
      toNode: null,
      fromTerminal: x.id,
      toTerminal: null,
      level: 1,
      isResolved: false,
      direction: direction,
      proxySibling: x.proxySibling,
      proxyParent: x.proxyParent,
      projectId: null,
      masterProjectId: null,
    };

    TransportTerminalDetectionRecursive(x, project, detection);
    detections.push(detection);
  });
  return detections;
};

/**
 * Detect terminals recursive.
 * @param terminal
 * @param project
 * @param current
 */
export const TransportTerminalDetectionRecursive = (terminal: Connector, project: Project, current: TransportDetection): void => {
  const edge =
    current.direction === TransportDirection.CounterFlow
      ? project.edges.find((x) => x.toConnectorId === terminal.id)
      : project.edges.find((x) => x.fromConnectorId === terminal.id);

  if (edge == null) return;

  const node =
    current.direction === TransportDirection.CounterFlow
      ? project.nodes.find((x) => x.id == edge.fromNodeId)
      : project.nodes.find((x) => x.id == edge.toNodeId);

  if (node == null) return;

  const connector =
    current.direction === TransportDirection.CounterFlow
      ? node.connectors.find((x) => x.id === edge.fromConnectorId)
      : node.connectors.find((x) => x.id === edge.toConnectorId);

  if (connector == null) return;

  if (IsTerminal(connector) && !connector.isProxy) {
    current.toTerminal = connector.id;
    current.isResolved = true;
    current.toNode = node.id;
    current.projectId = node.projectId;
    current.masterProjectId = node.masterProjectId;
    return;
  }
  current.level += 1;
  TransportTerminalDetectionRecursive(connector, project, current);
};

/**
 * Creates proxy terminals based on source and target.
 * @param source
 * @param target
 * @param dispatch
 */
export const CreateProxyTerminals = (source: Connector, target: Connector, dispatch: Dispatch): void => {
  // TODO: If bidirectional terminal

  const proxySourceInId: string = source ? CreateId() : null;
  const proxyTargetOutId: string = target ? CreateId() : null;

  if (source) {
    const proxySourceIn = {
      ...source,
      isProxy: true,
      proxyParent: source.id,
      proxySibling: proxyTargetOutId,
      attributes: null,
      type: ConnectorDirection.Input,
      id: proxySourceInId,
      connectorVisibility: ConnectorVisibility.InputVisible,
    } as Terminal;
    dispatch(addTerminal(proxySourceIn));
  }

  if (target) {
    const proxyTargetOut = {
      ...target,
      isProxy: true,
      proxyParent: target.id,
      proxySibling: proxySourceInId,
      attributes: null,
      type: ConnectorDirection.Output,
      id: proxyTargetOutId,
      connectorVisibility: ConnectorVisibility.OutputVisible,
    } as Terminal;
    dispatch(addTerminal(proxyTargetOut));
  }
};

/**
 * Update terminal id on siblings when connected.
 * @param source
 * @param target
 * @param sourceNode
 * @param targetNode
 * @param dispatch
 */
export const CreateSiblingProxyConnection = (
  source: Connector,
  target: Connector,
  sourceNode: Node,
  targetNode: Node,
  dispatch: Dispatch
): void => {
  if (!IsTerminalSiblings(sourceNode, targetNode)) return;

  const sourceProxy = sourceNode.connectors.find((x) => IsTerminal(x) && x.isProxy && x.proxyParent == source.id) as Terminal;
  const targetProxy = targetNode.connectors.find((x) => IsTerminal(x) && x.isProxy && x.proxyParent == target.id) as Terminal;

  if (sourceProxy != null && targetProxy != null) {
    targetProxy.proxySibling = sourceProxy.id;
    sourceProxy.proxySibling = targetProxy.id;
    dispatch(updateTerminal(targetProxy));
    dispatch(updateTerminal(sourceProxy));
  }
};

/**
 * Delete a proxy terminal.
 * @param connector
 * @param dispatch
 */
export const DeleteProxyTerminal = (connector: Connector, dispatch: Dispatch): void => {
  if (IsTerminal(connector) && connector.isProxy) {
    dispatch(deleteTerminal(connector));
  }
};

/**
 * Find a proxy terminal for given terminal
 * @param connectorId
 * @param node
 * @returns Connector
 */
export const FindProxyConnector = (connectorId: string, node: Node): Connector => {
  return node.connectors.find((x) => IsTerminal(x) && x.isProxy && x.proxyParent === connectorId);
};
