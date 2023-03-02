import { Connector, Edge, Interface, Node, Transport } from "@mimirorg/modelbuilder-types";
import { VisualFilterData, VisualFilterId } from "../../models/application/VisualFilter";
import { IsTerminal } from "../../services";
import { GetVisualFilterId } from "../../components/flow/helpers/GetVisualFilterId";
import { isHidden } from "../../models/helpers/isHidden";
import { EDGE_TYPE, EdgeType } from "../../models/project";
import { Edge as FlowEdge } from "react-flow-renderer/dist/esm/types/edges";
import { IsLocationRelation, IsPartOfRelation, IsProductRelation } from "../../components/flow/helpers/Connectors";
import { MimirNode } from "./MimirNode";

export class MimirEdge implements Edge {
  blockHidden: boolean;
  domain: string;
  fromConnector: Connector;
  fromConnectorId: string;
  fromConnectorIri: string;
  hidden: boolean;
  id: string;
  iri: string;
  isLocked: boolean;
  isLockedStatusBy: string;
  isLockedStatusDate: Date;
  kind: string;
  selected: boolean;
  fromNodeId: string;
  toNodeId: string;
  fromNode: Node;
  fromNodeIri: string;
  masterProjectId: string;
  masterProjectIri: string;
  projectId: string;
  projectIri: string;
  toConnector: Connector;
  toConnectorId: string;
  toConnectorIri: string;
  toNode: Node;
  toNodeIri: string;
  transport: Transport;
  transportId: string;
  interface: Interface;
  interfaceId: string;

  constructor(connection: Partial<Edge>) {
    this.blockHidden = connection.blockHidden ?? false;
    this.domain = connection.domain ?? null;
    this.fromConnector = connection.fromConnector ?? null;
    this.fromConnectorId = connection.fromConnectorId ?? null;
    this.fromConnectorIri = connection.fromConnectorIri ?? null;
    this.fromNodeId = connection.fromNodeId ?? null;
    this.toNodeId = connection.toNodeId ?? null;
    this.hidden = connection.hidden ?? null;
    this.id = connection.id ?? null;
    this.iri = connection.iri ?? null;
    this.isLocked = connection.isLocked ?? null;
    this.isLockedStatusBy = connection.isLockedStatusBy ?? null;
    this.isLockedStatusDate = connection.isLockedStatusDate ?? null;
    this.kind = connection.kind ?? null;
    this.selected = connection.selected ?? null;
    this.transportId = connection.transportId ?? null;
    this.transport = connection.transport ?? null;
    this.interfaceId = connection.interfaceId ?? null;
    this.interface = connection.interface ?? null;
  }

  /**
   * Function to convert a Mimir Edge to a FlowEdge that interacts with the Flow Library.
   * @param edge
   * @param edgeType
   * @param source
   * @param target
   * @param animated
   * @returns a FlowEdge.
   */
  public convertToFlowEdge(
    edgeType: EdgeType,
    source: Node,
    target: Node,
    filter: VisualFilterData,
    onEdgeSplitClick: (id: string, x: number, y: number) => void
  ): FlowEdge {
    const animated = filter.filters?.find((x) => x.id == VisualFilterId.ANIMATION)?.checked ?? false;
    const isAnimated = animated && IsTerminal(this.fromConnector);
    const filterId = GetVisualFilterId(source, target, edgeType);
    const hidden = isHidden(filter, filterId.Category, filterId.Item);

    return {
      id: this.id,
      type: edgeType,
      source: this.fromNodeId,
      target: this.toNodeId,
      sourceHandle: this.fromConnectorId,
      targetHandle: this.toConnectorId,
      arrowHeadType: null,
      animated: isAnimated,
      label: "",
      data: { source, target, edge: this, selected: this.selected, onEdgeSplitClick },
      hidden: hidden,
      parentType: source?.aspect,
      targetType: target?.aspect,
      selected: this.selected,
    } as FlowEdge;
  }

  public toFlowEdge(
    edgeType: EdgeType,
    nodes: MimirNode[],
    filter: VisualFilterData,
    onEdgeSplitClick: (id: string, x: number, y: number) => void
  ): FlowEdge {
    const sourceNode = nodes.find((node) => node.id === this.fromNodeId);
    const targetNode = nodes.find((node) => node.id === this.toNodeId);
    return this.convertToFlowEdge(edgeType, sourceNode, targetNode, filter, onEdgeSplitClick);
  }

  public getTreeEdgeType(conn: Connector): EdgeType {
    if (IsPartOfRelation(conn)) return EDGE_TYPE.TREE_PARTOF as EdgeType;
    if (IsLocationRelation(conn) || IsProductRelation(conn)) return EDGE_TYPE.TREE_RELATION as EdgeType;
    if (IsTerminal(conn)) return EDGE_TYPE.TREE_TRANSPORT as EdgeType;
  }
}
