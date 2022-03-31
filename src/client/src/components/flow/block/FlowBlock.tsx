/* eslint-disable react-hooks/exhaustive-deps */
import * as selectors from "./helpers/selectors";
import * as hooks from "./hooks";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { BuildFlowBlockNodes, BuildFlowBlockEdges } from "./builders";
import { useAppDispatch, useAppSelector } from "../../../redux/store/hooks";
import { GetBlockEdgeTypes, GetBlockNodeTypes, SetInitialEdgeVisibility } from "./helpers/";
import { VisualFilterComponent } from "../../menus/filterMenu/VisualFilterComponent";
import { BlockConnectionLine } from "./edges/connectionLine/BlockConnectionLine";
import { Size } from "../../../compLibrary/size/Size";
import { GetSelectedNode } from "../../../helpers";
import { CloseInspector, handleEdgeSelect, handleMultiSelect, handleNoSelect, handleNodeSelect } from "../handlers";
import { updateBlockNodes } from "../../../modules/explorer/redux/actions";
import { Project } from "../../../models";
import ReactFlow, {
  Node as FlowNode,
  Edge as FlowEdge,
  Connection,
  useNodesState,
  useEdgesState,
  useReactFlow,
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
  const flowWrapper = useRef(null);
  const { getViewport } = useReactFlow();

  const [flowInstance, setFlowInstance] = useState(null);

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const secondaryNodeRef = useAppSelector(selectors.secondaryNodeSelector);
  const icons = useAppSelector(selectors.iconSelector);
  const library = useAppSelector(selectors.librarySelector);
  const userState = useAppSelector(selectors.userStateSelector);
  const visualFilter = useAppSelector(selectors.filterSelector);
  const animatedEdge = useAppSelector(selectors.animatedEdgeSelector);
  const primaryNode = GetSelectedNode();
  const defaultZoom = Size.ZOOM_DEFAULT;
  const secondaryNode = project.nodes?.find((x) => x.id === secondaryNodeRef?.id);

  const OnLoad = useCallback(
    (_reactFlowInstance) => {
      setNodes(BuildFlowBlockNodes(project, primaryNode, secondaryNode));
      setEdges(BuildFlowBlockEdges(project, primaryNode, secondaryNode, animatedEdge));
      return setFlowInstance(_reactFlowInstance);
    },
    [project, primaryNode, secondaryNode]
  );

  // const OnElementsRemove = (flowNodesToRemove: Elements) => {
  //   return hooks.useOnRemove(flowNodesToRemove, inspectorRef, project, setElements, dispatch);
  // };

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

  const OnDrop = (event: React.DragEvent<HTMLDivElement>) => {
    return hooks.useOnDrop({
      event,
      project,
      user: userState.user,
      icons,
      library,
      secondaryNode: secondaryNodeRef,
      reactFlowInstance: flowInstance,
      reactFlowWrapper: flowWrapper,
      getViewport,
      dispatch,
    });
  };

  // const onSelectionChange = (selectedElements: Elements) => {
  //   if (selectedElements === null) {
  //     handleNoSelect(project, inspectorRef, dispatch, true);
  //   } else if (selectedElements.length === 1 && GetBlockNodeTypes[selectedElements[0]?.type]) {
  //     handleNodeSelect(selectedElements[0], dispatch, true);
  //   } else if (selectedElements.length === 1 && GetBlockEdgeTypes[selectedElements[0]?.type]) {
  //     handleEdgeSelect(selectedElements[0], dispatch, true);
  //   } else if (selectedElements.length > 1) {
  //     handleMultiSelect(dispatch, true);
  //   }
  // };

  useEffect(() => {
    CloseInspector(inspectorRef, dispatch);
  }, [inspectorRef, dispatch]);

  useEffect(() => {
    OnLoad(flowInstance);
  }, [OnLoad, flowInstance]);

  useEffect(() => {
    dispatch(updateBlockNodes(nodes));
  }, [nodes, dispatch]);

  useEffect(() => {
    SetInitialEdgeVisibility(project, dispatch);
  }, []);

  return (
    <>
      <div className="reactflow-wrapper" ref={flowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={GetBlockNodeTypes}
          edgeTypes={GetBlockEdgeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={OnConnect}
          onConnectStart={OnConnectStart}
          onConnectStop={OnConnectStop}
          // onElementsRemove={OnElementsRemove}
          onLoad={OnLoad}
          onDrop={OnDrop}
          onDragOver={OnDragOver}
          onNodeDragStop={OnNodeDragStop}
          // onMoveEnd={OnMoveEnd}
          onlyRenderVisibleElements
          multiSelectionKeyCode={"Control"}
          connectionLineComponent={BlockConnectionLine}
          // onSelectionChange={(e) => onSelectionChange(e)}
          deleteKeyCode={"Delete"}
          zoomOnDoubleClick={false}
          defaultZoom={defaultZoom}
          minZoom={0.2}
          maxZoom={3}
          zoomOnScroll
          panOnDrag
        ></ReactFlow>
        {visualFilter && <VisualFilterComponent flowNodes={nodes} flowEdges={edges} edgeAnimation={animatedEdge} />}
      </div>
    </>
  );
};

export default FlowBlock;
