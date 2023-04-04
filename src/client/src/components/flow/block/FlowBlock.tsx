/* eslint-disable react-hooks/exhaustive-deps */
import * as selectors from "redux/store/selectors";
import * as hooks from "./hooks";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useAppSelector } from "../../../store/hooks";
import { BlockConnectionLine } from "./edges/connectionLine/BlockConnectionLine";
import { Size } from "../../../assets/size/Size";
import { Spinner, SpinnerWrapper } from "../../../compLibrary/spinner/";
import { Dispatch } from "redux";
import ReactFlow, {
  Node as FlowNode,
  Edge as FlowEdge,
  Connection,
  useReactFlow,
  ReactFlowInstance,
  NodeChange,
  EdgeChange,
} from "react-flow-renderer";
import { GetEdgeTypes, GetNodeTypes } from "../helpers";
import { VisualFilterData } from "../../../models/application/VisualFilter";

interface Props {
  inspectorRef: React.MutableRefObject<HTMLDivElement>;
  dispatch: Dispatch;
  filter: VisualFilterData;
}

/**
 * Component for the Flow library in BlockView. This is the main component in Mimir.
 * In BlockView the selectedBlockNode is the node marked with a full checkbox in the Explorer, and functions as a ParentNode.
 * The selectedNode is the child node that is selected on the canvas.
 * The secondaryNode is the second ParentNode, displayed to the right of the parentNode.
 * The secondaryNode is only set if two parents are chosen from the Explorer, this state is called Split View.
 * @param interface
 * @returns a canvas with Flow elements and Mimir nodes, edges and transports.
 */
export const FlowBlock = ({ inspectorRef, dispatch, filter }: Props) => {
  const { getViewport } = useReactFlow();
  const flowWrapper = useRef(null);
  const [instance, setFlowInstance] = useState<ReactFlowInstance>(null);
  const [flowNodes, setNodes] = useState<FlowNode[]>([] as FlowNode[]);
  const [flowEdges, setEdges] = useState<FlowEdge[]>([] as FlowEdge[]);
  const [hasRendered, setHasRendered] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const project = useAppSelector(selectors.projectSelector);
  const user = useAppSelector(selectors.userStateSelector).user;
  const animatedEdge = useAppSelector(selectors.animatedEdgeSelector);
  const terminals = useAppSelector(selectors.terminalsSelector);
  const library = useAppSelector(selectors.librarySelector);
  const mimirNodes = project?.aspectObjects ?? [];
  const mimirEdges = project?.connections ?? [];
  const selectedNode = mimirNodes.find((n) => n.selected);
  const selectedBlockNode = mimirNodes.find((n) => n.blockSelected);
  const selectedEdge = mimirEdges.find((e) => e.selected);

  const OnInit = useCallback((_reactFlowInstance: ReactFlowInstance) => {
    return setFlowInstance(_reactFlowInstance);
  }, []);

  const OnConnectStart = (e: React.MouseEvent, { nodeId, handleType, handleId }) => {
    return hooks.useOnConnectStart(e, { nodeId, handleType, handleId });
  };

  const OnConnectStop = (e: MouseEvent) => {
    return hooks.useOnConnectStop(e, project, dispatch);
  };

  const OnConnect = (connection: FlowEdge | Connection) => {
    return hooks.useOnBlockConnect({ connection, project, setEdges });
  };

  const OnDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const OnNodeDragStop = useCallback((_event: React.DragEvent<HTMLDivElement>, activeNode: FlowNode) => {
    return hooks.useOnDragStop(activeNode, dispatch);
  }, []);

  const OnDrop = (event: React.DragEvent<HTMLDivElement>) => {
    return hooks.useOnBlockDrop({
      event,
      project,
      user,
      selectedNode,
      instance,
      getViewport,
      dispatch,
      terminals,
    });
  };

  const OnNodesChange = useCallback(
    (changes: NodeChange[]) => {
      return hooks.useOnBlockNodesChange({
        project,
        selectedNode,
        selectedBlockNode,
        changes,
        setNodes,
        dispatch,
        inspectorRef,
      });
    },
    [selectedNode]
  );

  const OnEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      return hooks.useOnBlockEdgesChange(project, changes, selectedBlockNode, selectedEdge, setEdges, inspectorRef, dispatch);
    },
    [selectedEdge]
  );

  // Build initial elements from Project on first render
  useEffect(() => {
    if (!hasRendered && project) {
      setIsFetching(true);
      setNodes(project.toFlowNodes("Block", selectedBlockNode?.id));
      setEdges(project.toFlowEdges("Block"));
      setHasRendered(true);
      setIsFetching(false);
    }
  }, []);

  // Rerender nodes
  useEffect(() => {
    if (!project) return;
    setNodes(project.toFlowNodes("Block", selectedBlockNode?.id));
  }, [mimirNodes, false]);

  // Rerender edges
  useEffect(() => {
    if (!project) return;
    setEdges(project.toFlowEdges("Block"));
  }, [mimirEdges, mimirNodes, filter]);

  return (
    <div className="reactflow-wrapper" ref={flowWrapper}>
      <SpinnerWrapper fetching={isFetching}>
        <Spinner />
      </SpinnerWrapper>
      <ReactFlow
        onInit={OnInit}
        nodes={flowNodes}
        edges={flowEdges}
        nodeTypes={useMemo(() => GetNodeTypes, [])}
        edgeTypes={useMemo(() => GetEdgeTypes, [])}
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
