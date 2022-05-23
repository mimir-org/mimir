/* eslint-disable react-hooks/exhaustive-deps */
import * as selectors from "./helpers/selectors";
import * as hooks from "./hooks";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BuildFlowBlockNodes, BuildFlowBlockEdges } from "./builders";
import { useAppSelector } from "../../../redux/store/hooks";
import { GetBlockEdgeTypes, GetBlockNodeTypes, SetInitialEdgeVisibility, SetInitialParentId } from "./helpers/";
import { BlockConnectionLine } from "./edges/connectionLine/BlockConnectionLine";
import { Size } from "../../../compLibrary/size/Size";
import { Spinner, SpinnerWrapper } from "../../../compLibrary/spinner/";
import { Dispatch } from "redux";
import ReactFlow, {
  Node as FlowNode,
  Edge as FlowEdge,
  Connection,
  useNodesState,
  useEdgesState,
  useReactFlow,
  ReactFlowInstance,
  NodeChange,
  EdgeChange,
} from "react-flow-renderer";

interface Props {
  inspectorRef: React.MutableRefObject<HTMLDivElement>;
  dispatch: Dispatch;
}

/**
 * Component for the Flow library in BlockView. This is the main component in Mimir.
 * @param interface
 * @returns a canvas with Flow elements and Mimir nodes, transports and edges.
 */
const FlowBlock = ({ inspectorRef, dispatch }: Props) => {
  const { getViewport } = useReactFlow();
  const flowWrapper = useRef(null);
  const [instance, setFlowInstance] = useState<ReactFlowInstance>(null);
  const [flowNodes, setNodes] = useNodesState([]);
  const [flowEdges, setEdges] = useEdgesState([]);
  const [hasRendered, setHasRendered] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const project = useAppSelector(selectors.projectSelector);
  const secondaryNodeRef = useAppSelector(selectors.secondaryNodeSelector);
  const icons = useAppSelector(selectors.iconSelector);
  const lib = useAppSelector(selectors.librarySelector);
  const user = useAppSelector(selectors.userStateSelector).user;
  const animatedEdge = useAppSelector(selectors.animatedEdgeSelector);
  const mimirNodes = project?.nodes ?? [];
  const mimirEdges = project?.edges ?? [];
  const selectedNode = mimirNodes.find((n) => n.selected);
  const selectedBlockNode = mimirNodes.find((n) => n.blockSelected);
  const secondaryNode = mimirNodes.find((n) => n.id === secondaryNodeRef?.id);
  const selectedEdge = mimirEdges.find((e) => e.selected);

  const OnInit = useCallback((_reactFlowInstance: ReactFlowInstance) => {
    return setFlowInstance(_reactFlowInstance);
  }, []);

  const OnConnectStart = (e: React.MouseEvent, { nodeId, handleType, handleId }) => {
    return hooks.useOnConnectStart(e, { nodeId, handleType, handleId });
  };

  const OnConnectStop = (e: MouseEvent) => {
    return hooks.useOnConnectStop(e, mimirNodes, mimirEdges, selectedNode, secondaryNode, getViewport, dispatch);
  };

  const OnConnect = (connection: FlowEdge | Connection) => {
    return hooks.useOnConnect({ connection, project, lib, animatedEdge, setEdges, dispatch });
  };

  const OnDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const OnNodeDragStop = useCallback((_event: React.DragEvent<HTMLDivElement>, activeNode: FlowNode) => {
    return hooks.useOnDragStop(activeNode, dispatch);
  }, []);

  const OnDrop = (event: React.DragEvent<HTMLDivElement>) => {
    return hooks.useOnDrop({ event, project, user, icons, lib, selectedNode, secondaryNode, instance, getViewport, dispatch });
  };

  const OnNodesChange = useCallback(
    (changes: NodeChange[]) => {
      return hooks.useOnBlockNodesChange(project, selectedNode, selectedBlockNode, changes, setNodes, dispatch, inspectorRef);
    },
    [selectedNode]
  );

  const OnEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      return hooks.useOnBlockEdgesChange(project, changes, selectedBlockNode, selectedEdge, setEdges, inspectorRef, dispatch);
    },
    [selectedEdge, selectedBlockNode]
  );

  // Build initial elements from Project
  useEffect(() => {
    if (!hasRendered && project) {
      setIsFetching(true);
      SetInitialParentId(mimirNodes);
      setNodes(BuildFlowBlockNodes(mimirNodes, mimirEdges, selectedBlockNode, secondaryNode));
      setEdges(BuildFlowBlockEdges(mimirNodes, mimirEdges, selectedBlockNode, secondaryNode, flowNodes, animatedEdge));
      setHasRendered(true);
      setIsFetching(false);
    }
  }, []);

  // Rerender nodes
  useEffect(() => {
    if (!project) return;
    setNodes(BuildFlowBlockNodes(mimirNodes, mimirEdges, selectedBlockNode, secondaryNode));
  }, [mimirNodes, secondaryNode]);

  // Rerender edges
  useEffect(() => {
    if (!project) return;
    setEdges(BuildFlowBlockEdges(mimirNodes, mimirEdges, selectedBlockNode, secondaryNode, flowNodes, animatedEdge));
  }, [mimirEdges, mimirNodes, animatedEdge]);

  // Show transport edges by default, timeout is added due to loading of OffPage nodes
  useEffect(() => {
    setIsFetching(true);
    setTimeout(() => {
      SetInitialEdgeVisibility(mimirEdges, dispatch);
      setIsFetching(false);
    }, 500);
  }, []);

  return (
    <div className="reactflow-wrapper" ref={flowWrapper}>
      <SpinnerWrapper fetching={isFetching}>
        <Spinner />
      </SpinnerWrapper>

      <ReactFlow
        onInit={OnInit}
        nodes={flowNodes}
        edges={flowEdges}
        nodeTypes={useMemo(() => GetBlockNodeTypes, [])}
        edgeTypes={useMemo(() => GetBlockEdgeTypes, [])}
        onNodesChange={OnNodesChange}
        onEdgesChange={OnEdgesChange}
        onConnect={OnConnect}
        onConnectStart={OnConnectStart}
        onConnectStop={OnConnectStop}
        onDrop={OnDrop}
        onDragOver={OnDragOver}
        onNodeDragStop={OnNodeDragStop}
        connectionLineComponent={BlockConnectionLine}
        deleteKeyCode={"Delete"}
        zoomOnDoubleClick={false}
        defaultZoom={Size.ZOOM_DEFAULT}
        minZoom={0.2}
        maxZoom={3}
        onlyRenderVisibleElements
        zoomOnScroll
        panOnDrag
      ></ReactFlow>
    </div>
  );
};

export default FlowBlock;
