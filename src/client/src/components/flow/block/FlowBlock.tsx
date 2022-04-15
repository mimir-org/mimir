/* eslint-disable react-hooks/exhaustive-deps */
import * as selectors from "./helpers/selectors";
import * as hooks from "./hooks";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BuildFlowBlockNodes, BuildFlowBlockEdges } from "./builders";
import { useAppDispatch, useAppSelector } from "../../../redux/store/hooks";
import { GetBlockEdgeTypes, GetBlockNodeTypes, SetInitialEdgeVisibility } from "./helpers/";
import { BlockConnectionLine } from "./edges/connectionLine/BlockConnectionLine";
import { Size } from "../../../compLibrary/size/Size";
import { HandleBlockNodeSelection, CloseInspector } from "./handlers";
import { ValidateNodePosition } from "./helpers/ValidateNodePosition";
import { IsPositionChange } from "./helpers/IsPositionChange";
import { Spinner, SpinnerWrapper } from "../../../compLibrary/spinner/Spinner";
import ReactFlow, {
  Node as FlowNode,
  Edge as FlowEdge,
  Connection,
  useNodesState,
  useEdgesState,
  useReactFlow,
  ReactFlowInstance,
  OnSelectionChangeParams,
  applyNodeChanges,
  applyEdgeChanges,
  NodeChange,
  EdgeChange,
  NodePositionChange,
} from "react-flow-renderer";

interface Props {
  inspectorRef: React.MutableRefObject<HTMLDivElement>;
}

/**
 * Component for the Flow library in BlockView.
 * @param interface
 * @returns a canvas with Flow elements and Mimir nodes, transports and edges.
 */
const FlowBlock = ({ inspectorRef }: Props) => {
  const dispatch = useAppDispatch();
  const { getViewport } = useReactFlow();
  const flowWrapper = useRef(null);
  const [instance, setFlowInstance] = useState<ReactFlowInstance>(null);
  const [nodes, setNodes] = useNodesState([]);
  const [edges, setEdges] = useEdgesState([]);
  const [hasRendered, setHasRendered] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const project = useAppSelector(selectors.projectSelector);
  const secondaryNodeRef = useAppSelector(selectors.secondaryNodeSelector);
  const icons = useAppSelector(selectors.iconSelector);
  const lib = useAppSelector(selectors.librarySelector);
  const user = useAppSelector(selectors.userStateSelector).user;
  const animatedEdge = useAppSelector(selectors.animatedEdgeSelector);
  const selectedNode = project?.nodes?.find((n) => n.selected);
  const defaultZoom = Size.ZOOM_DEFAULT;
  const secondaryNode = project?.nodes?.find((x) => x.id === secondaryNodeRef?.id);

  const OnInit = useCallback((_reactFlowInstance: ReactFlowInstance) => {
    return setFlowInstance(_reactFlowInstance);
  }, []);

  const OnConnectStart = (e: React.MouseEvent, { nodeId, handleType, handleId }) => {
    return hooks.useOnConnectStart(e, { nodeId, handleType, handleId });
  };

  const OnConnectStop = (e: MouseEvent) => {
    return hooks.useOnConnectStop(e, project, selectedNode, secondaryNode, getViewport, dispatch);
  };

  const OnConnect = (connection: FlowEdge | Connection) => {
    return hooks.useOnConnect({ connection, project, lib, animatedEdge, setEdges, dispatch });
  };

  const OnDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const OnNodeDragStop = (_event: React.DragEvent<HTMLDivElement>, activeNode: FlowNode) => {
    return hooks.useOnDragStop(_event, activeNode, dispatch);
  };

  const OnNodesDelete = (nodesToDelete: FlowNode[]) => {
    return hooks.useOnNodeDelete(nodesToDelete, inspectorRef, project, dispatch);
  };

  const OnEdgesDelete = (edgesToDelete: FlowEdge[]) => {
    return hooks.useOnEdgeDelete(edgesToDelete, inspectorRef, project, dispatch);
  };

  const OnDrop = (event: React.DragEvent<HTMLDivElement>) => {
    return hooks.useOnDrop({ event, project, user, icons, lib, selectedNode, secondaryNode, instance, getViewport, dispatch });
  };

  const OnNodesChange = useCallback(
    (changes: NodeChange[]) => {
      if (IsPositionChange(changes) && !ValidateNodePosition(changes as NodePositionChange[], project)) return;
      setNodes((n) => applyNodeChanges(changes, n));
    },
    [project?.nodes?.length]
  );

  const OnEdgesChange = useCallback((changes: EdgeChange[]) => {
    setEdges((e) => applyEdgeChanges(changes, e));
  }, []);

  const nodeTypes = useMemo(() => GetBlockNodeTypes, []);
  const edgeTypes = useMemo(() => GetBlockEdgeTypes, []);

  const OnSelectionChange = (selectedItems: OnSelectionChangeParams) =>
    HandleBlockNodeSelection(selectedItems, project, inspectorRef, dispatch);

  // Build initial elements from Project
  useEffect(() => {
    if (!hasRendered && project) {
      setIsFetching(true);
      setNodes(BuildFlowBlockNodes(project, selectedNode, secondaryNode));
      setEdges(BuildFlowBlockEdges(project, secondaryNode, nodes, animatedEdge));
      setHasRendered(true);
      setIsFetching(false);
    }
  }, [project]);

  // Rebuild nodes
  useEffect(() => {
    if (!project) return;
    setNodes(BuildFlowBlockNodes(project, selectedNode, secondaryNode));
  }, [project?.nodes?.length]);

  // Rebuild edges
  useEffect(() => {
    if (!project) return;
    setEdges(BuildFlowBlockEdges(project, secondaryNode, nodes, animatedEdge));
  }, [project?.edges, animatedEdge]);

  useEffect(() => {
    CloseInspector(inspectorRef, dispatch);
  }, [inspectorRef, dispatch]);

  // Show transport edges by default, timeout is added due to loading of OffPage nodes
  useEffect(() => {
    setIsFetching(true);
    setTimeout(() => {
      SetInitialEdgeVisibility(project?.edges, dispatch);
      setIsFetching(false);
    }, 400);
  }, []);

  return (
    <div className="reactflow-wrapper" ref={flowWrapper}>
      <SpinnerWrapper fetching={isFetching}>
        <Spinner />
      </SpinnerWrapper>

      <ReactFlow
        onInit={OnInit}
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodesChange={OnNodesChange}
        onEdgesChange={OnEdgesChange}
        onNodesDelete={OnNodesDelete}
        onEdgesDelete={OnEdgesDelete}
        onConnect={OnConnect}
        onConnectStart={OnConnectStart}
        onConnectStop={OnConnectStop}
        onDrop={OnDrop}
        onDragOver={OnDragOver}
        onNodeDragStop={OnNodeDragStop}
        multiSelectionKeyCode={"Control"}
        connectionLineComponent={BlockConnectionLine}
        onSelectionChange={(e) => OnSelectionChange(e)}
        deleteKeyCode={"Delete"}
        zoomOnDoubleClick={false}
        defaultZoom={defaultZoom}
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
