/* eslint-disable react-hooks/exhaustive-deps */
import * as selectors from "./helpers/selectors";
import * as hooks from "./hooks";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { BuildFlowBlockNodes, BuildFlowBlockEdges } from "./builders";
import { useAppDispatch, useAppSelector } from "../../../redux/store/hooks";
import { GetBlockEdgeTypes, GetBlockNodeTypes, SetInitialEdgeVisibility } from "./helpers/";
import { BlockConnectionLine } from "./edges/connectionLine/BlockConnectionLine";
import { Size } from "../../../compLibrary/size/Size";
import { CloseInspector, HandleNodeSelection } from "../handlers";
import { Project } from "../../../models";
import ReactFlow, {
  Node as FlowNode,
  Edge as FlowEdge,
  Connection,
  useNodesState,
  useEdgesState,
  useReactFlow,
  ReactFlowInstance,
  OnSelectionChangeParams,
} from "react-flow-renderer";

interface Props {
  project: Project;
  inspectorRef: React.MutableRefObject<HTMLDivElement>;
}

/**
 * Component for the Flow library in BlockView.
 * @param interface
 * @returns a canvas with Flow elements and Mimir nodes, transports and edges.
 */
const FlowBlock = ({ project, inspectorRef }: Props) => {
  const dispatch = useAppDispatch();
  const { getViewport } = useReactFlow();
  const flowWrapper = useRef(null);
  const [flowInstance, setFlowInstance] = useState<ReactFlowInstance>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [hasRendered, setHasRendered] = useState(false);
  const secondaryNodeRef = useAppSelector(selectors.secondaryNodeSelector);
  const icons = useAppSelector(selectors.iconSelector);
  const library = useAppSelector(selectors.librarySelector);
  const user = useAppSelector(selectors.userStateSelector).user;
  const animatedEdge = useAppSelector(selectors.animatedEdgeSelector);
  const primaryNode = project?.nodes?.find((n) => n.isSelected);
  const defaultZoom = Size.ZOOM_DEFAULT;
  const secondaryNode = project?.nodes?.find((x) => x.id === secondaryNodeRef?.id);

  const OnInit = useCallback((_reactFlowInstance: ReactFlowInstance) => {
    return setFlowInstance(_reactFlowInstance);
  }, []);

  const OnConnectStart = (e, { nodeId, handleType, handleId }) => {
    return hooks.useOnConnectStart(e, { nodeId, handleType, handleId });
  };

  const OnConnectStop = (e: MouseEvent) => {
    return hooks.useOnConnectStop(e, project, primaryNode, secondaryNode, getViewport, dispatch);
  };

  const OnConnect = (connection: FlowEdge | Connection) => {
    return hooks.useOnConnect({ connection, project, library, animatedEdge, setEdges, dispatch });
  };

  const OnDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const OnNodeDragStop = (_event: React.DragEvent<HTMLDivElement>, activeNode: FlowNode) => {
    return hooks.useOnDragStop(_event, activeNode, dispatch);
  };

  // const OnMoveEnd = (flowTransform: FlowTransform) => dispatch(changeFlowTransform(flowTransform));
  // const OnNodesChange = useCallback((changes) => setNodes((n) => applyNodeChanges(changes, n)), []);
  // const OnEdgesChange = useCallback((changes) => setEdges((e) => applyEdgeChanges(changes, e)), []);

  const OnNodesDelete = (nodesToDelete: FlowNode[]) => {
    return hooks.useOnNodeDelete(nodesToDelete, inspectorRef, project, dispatch);
  };

  const OnEdgesDelete = (edgesToDelete: FlowEdge[]) => {
    return hooks.useOnEdgeDelete(edgesToDelete, inspectorRef, project, dispatch);
  };

  const OnDrop = (event: React.DragEvent<HTMLDivElement>) => {
    return hooks.useOnDrop({
      event,
      project,
      user,
      icons,
      library,
      selectedNode: primaryNode,
      secondaryNode: secondaryNodeRef,
      flowInstance,
      flowWrapper,
      getViewport,
      dispatch,
    });
  };

  const OnSelectionChange = (selectedItems: OnSelectionChangeParams) =>
    HandleNodeSelection(selectedItems, project, inspectorRef, dispatch);

  // Build initial elements from Project
  useEffect(() => {
    if (!hasRendered && project) {
      setNodes(BuildFlowBlockNodes(project, primaryNode, secondaryNode));
      setEdges(BuildFlowBlockEdges(project, secondaryNode, nodes, animatedEdge));
      setHasRendered(true);
    }
  }, [project]);

  // Rebuild elements
  useEffect(() => {
    if (project) {
      setNodes(BuildFlowBlockNodes(project, primaryNode, secondaryNode));
      setEdges(BuildFlowBlockEdges(project, secondaryNode, nodes, animatedEdge));
    }
  }, [project]);

  useEffect(() => {
    CloseInspector(inspectorRef, dispatch);
  }, [inspectorRef, dispatch]);

  useEffect(() => {
    SetInitialEdgeVisibility(project, dispatch);
  }, []);

  return (
    <div className="reactflow-wrapper" ref={flowWrapper}>
      <ReactFlow
        onInit={OnInit}
        nodes={nodes}
        edges={edges}
        nodeTypes={GetBlockNodeTypes}
        edgeTypes={GetBlockEdgeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
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
