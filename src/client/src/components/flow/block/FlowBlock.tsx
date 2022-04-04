/* eslint-disable react-hooks/exhaustive-deps */

import * as selectors from "./helpers/selectors";
// import * as hooks from "./hooks";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BuildFlowBlockNodes, BuildFlowBlockEdges } from "./builders";
import { useAppDispatch, useAppSelector } from "../../../redux/store/hooks";
import { GetBlockEdgeTypes, GetBlockNodeTypes, SetInitialEdgeVisibility } from "./helpers/";
import { BlockConnectionLine } from "./edges/connectionLine/BlockConnectionLine";
import { Size } from "../../../compLibrary/size/Size";
import { CloseInspector, HandleNodeSelection } from "../handlers";
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
} from "react-flow-renderer";
import {
  useOnConnectStart,
  useOnConnectStop,
  useOnConnect,
  useOnDrop,
  useOnDragStop,
  useOnEdgeDelete,
  useOnNodeDelete,
} from "./hooks";

interface Props {
  inspectorRef: React.MutableRefObject<HTMLDivElement>;
}

/**
 * Component for the Flow library in BlockView.
 * @param interface
 * @returns a canvas with Flow elements and Mimir nodes, transports and edges.
 */
const FlowBlock = ({ inspectorRef }: Props) => {
  const project = useAppSelector(selectors.projectSelector);
  const dispatch = useAppDispatch();
  const { getViewport } = useReactFlow();
  const wrapper = useRef(null);
  const [instance, setFlowInstance] = useState<ReactFlowInstance>(null);
  const [nodes, setNodes] = useNodesState([]);
  const [edges, setEdges] = useEdgesState([]);
  const [hasRendered, setHasRendered] = useState(false);
  const secondaryNodeRef = useAppSelector(selectors.secondaryNodeSelector);
  const icons = useAppSelector(selectors.iconSelector);
  const lib = useAppSelector(selectors.librarySelector);
  const user = useAppSelector(selectors.userStateSelector).user;
  const animatedEdge = useAppSelector(selectors.animatedEdgeSelector);
  const selectedNode = project?.nodes?.find((n) => n.isSelected);
  const defaultZoom = Size.ZOOM_DEFAULT;
  const secondaryNode = project?.nodes?.find((x) => x.id === secondaryNodeRef?.id);

  const OnInit = useCallback((_reactFlowInstance: ReactFlowInstance) => {
    return setFlowInstance(_reactFlowInstance);
  }, []);

  const OnConnectStart = (e, { nodeId, handleType, handleId }) => {
    return useOnConnectStart(e, { nodeId, handleType, handleId });
  };

  const OnConnectStop = (e: MouseEvent) => {
    return useOnConnectStop(e, project, selectedNode, secondaryNode, getViewport, dispatch);
  };

  const OnConnect = (connection: FlowEdge | Connection) => {
    return useOnConnect({ connection, project, lib, animatedEdge, setEdges, dispatch });
  };

  const OnDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const OnNodeDragStop = (_event: React.DragEvent<HTMLDivElement>, activeNode: FlowNode) => {
    return useOnDragStop(_event, activeNode, dispatch);
  };

  // const OnMoveEnd = (flowTransform: FlowTransform) => dispatch(changeFlowTransform(flowTransform));
  const OnNodesChange = useCallback((changes) => setNodes((n) => applyNodeChanges(changes, n)), []);
  const OnEdgesChange = useCallback((changes) => setEdges((e) => applyEdgeChanges(changes, e)), []);

  const OnNodesDelete = (nodesToDelete: FlowNode[]) => {
    return useOnNodeDelete(nodesToDelete, inspectorRef, project, dispatch);
  };

  const OnEdgesDelete = (edgesToDelete: FlowEdge[]) => {
    return useOnEdgeDelete(edgesToDelete, inspectorRef, project, dispatch);
  };

  const OnDrop = (event: React.DragEvent<HTMLDivElement>) => {
    return useOnDrop({
      event,
      project,
      user,
      icons,
      lib,
      selectedNode,
      secondaryNodeRef,
      instance,
      wrapper,
      getViewport,
      dispatch,
    });
  };

  const OnSelectionChange = (selectedItems: OnSelectionChangeParams) =>
    HandleNodeSelection(selectedItems, project, dispatch, true);

  // Build initial elements from Project
  useEffect(() => {
    if (!hasRendered && project) {
      setNodes(BuildFlowBlockNodes(project, selectedNode, secondaryNode));
      setEdges(BuildFlowBlockEdges(project, secondaryNode, nodes, animatedEdge));
      setHasRendered(true);
    }
  }, [project]);

  // Rebuild elements
  useEffect(() => {
    if (project) {
      setNodes(BuildFlowBlockNodes(project, selectedNode, secondaryNode));
      setEdges(BuildFlowBlockEdges(project, secondaryNode, nodes, animatedEdge));
    }
  }, [project, animatedEdge]);

  useEffect(() => {
    CloseInspector(inspectorRef, dispatch);
  }, [inspectorRef, dispatch]);

  useEffect(() => {
    SetInitialEdgeVisibility(project, dispatch);
  }, []);

  const nodeTypes = useMemo(() => GetBlockNodeTypes, []);
  const edgeTypes = useMemo(() => GetBlockEdgeTypes, []);

  return (
    <div className="reactflow-wrapper" ref={wrapper}>
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
