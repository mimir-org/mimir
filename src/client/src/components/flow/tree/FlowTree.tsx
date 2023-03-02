/* eslint-disable react-hooks/exhaustive-deps */
import { MutableRefObject, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { TreeConnectionLine } from "./edges/connectionLine/TreeConnectionLine";
import { Size } from "../../../assets/size/Size";
import { Spinner, SpinnerWrapper } from "../../../compLibrary/spinner/";
import { Dispatch } from "redux";
import ReactFlow, { Background, Edge as FlowEdge, Node as FlowNode, ReactFlowInstance } from "react-flow-renderer";
import { GetEdgeTypes, GetNodeTypes } from "../helpers";
import { MimirProject } from "../../../lib/classes/MimirProject";
import { TerminalLibCm } from "@mimirorg/typelibrary-types";
import { VisualFilterData, VisualFilterId } from "../../../lib/models/VisualFilter";

interface Props {
  inspectorRef: MutableRefObject<HTMLDivElement>;
  dispatch: Dispatch;
  filter: VisualFilterData;
  project: MimirProject;
  terminals: TerminalLibCm;
  user: string;
}

/**
 * Component for the Flow library in TreeView.
 * @param interface
 * @returns a canvas with Flow elements and Mimir nodes, edges and transports.
 */
export const FlowTree = ({ inspectorRef, dispatch, filter, project, terminals, user }: Props) => {
  const flowWrapper = useRef(null);
  const [flowInstance, setFlowInstance] = useState<ReactFlowInstance>(null);
  const [flowNodes, setNodes] = useState<FlowNode[]>([] as FlowNode[]);
  const [flowEdges, setEdges] = useState<FlowEdge[]>([] as FlowEdge[]);
  const [hasRendered, setHasRendered] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const nodes = project.nodes;
  const edges = project.edges;
  const selectedNode = nodes?.find((n) => n.selected);
  const selectedEdge = edges?.find((e) => e.selected);
  const hasAnimation = filter.filters.find((x) => x.id == VisualFilterId.ANIMATION)?.checked ?? false;

  const OnInit = useCallback((_reactFlowInstance: ReactFlowInstance) => {
    return setFlowInstance(_reactFlowInstance);
  }, []);

  const OnEdgeSplitClick = (id: string, x: number, y: number) => {
    const currentEdge = project.edges.find((x) => x.id === id);
  };

  // Build initial elements from Project
  useEffect(() => {
    if (!hasRendered && project) {
      setIsFetching(true);
      //TODO: project.toFlownodes in state
      setNodes(project.buildFlowTreeNodes());
      setEdges(project.buildFlowTreeConnections(filter, OnEdgeSplitClick));
      setHasRendered(true);
      setIsFetching(false);
    }
  }, []);

  // Rebuild nodes and edges
  useEffect(() => {
    if (!project) return;
    setNodes(project.buildFlowTreeNodes());
    setEdges(project.buildFlowTreeConnections(filter, OnEdgeSplitClick));
  }, [nodes, edges, selectedNode, filter]);

  return (
    <div className="reactflow-wrapper" ref={flowWrapper}>
      <SpinnerWrapper fetching={isFetching}>
        <Spinner />
      </SpinnerWrapper>

      <ReactFlow
        onInit={OnInit}
        nodes={flowNodes}
        edges={flowEdges}
        onNodesDelete={null}
        nodeTypes={useMemo(() => GetNodeTypes, [])}
        edgeTypes={useMemo(() => GetEdgeTypes, [])}
        defaultZoom={0.7}
        minZoom={0.1}
        defaultPosition={[window.innerWidth / 3, Size.BLOCK_MARGIN_Y]}
        zoomOnDoubleClick={false}
        multiSelectionKeyCode={"Control"}
        connectionLineComponent={TreeConnectionLine}
        deleteKeyCode={"Delete"}
      >
        <Background />
      </ReactFlow>
    </div>
  );
};

export default FlowTree;
