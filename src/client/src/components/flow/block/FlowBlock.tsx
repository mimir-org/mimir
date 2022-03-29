/* eslint-disable react-hooks/exhaustive-deps */
import * as selectors from "./helpers/selectors";
import * as hooks from "./hooks";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { BuildFlowBlockElements } from "./builders";
import { useAppDispatch, useAppSelector } from "../../../redux/store/hooks";
import { GetBlockEdgeTypes, GetBlockNodeTypes, SetInitialEdgeVisibility } from "./helpers/";
import { VisualFilterComponent } from "../../menus/filterMenu/VisualFilterComponent";
import { BlockConnectionLine } from "./edges/connectionLine/BlockConnectionLine";
import { Size } from "../../../compLibrary/size/Size";
import { GetSelectedNode } from "../../../helpers";
import { CloseInspector, handleEdgeSelect, handleMultiSelect, handleNoSelect, handleNodeSelect } from "../handlers";
import { updateBlockElements } from "../../../modules/explorer/redux/actions";
import { Project } from "../../../models";
import { changeFlowTransform } from "../../../redux/store/flowTransform/flowTransformSlice";
import ReactFlow, { Elements, Node as FlowNode, Edge as FlowEdge, Connection, FlowTransform } from "react-flow-renderer";

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
  const [flowInstance, setFlowInstance] = useState(null);
  const [elements, setElements] = useState<Elements>([]);
  const [hasRendered, setHasRendered] = useState(false);
  const secondaryNodeRef = useAppSelector(selectors.secondaryNodeSelector);
  const icons = useAppSelector(selectors.iconSelector);
  const library = useAppSelector(selectors.librarySelector);
  const userState = useAppSelector(selectors.userStateSelector);
  const visualFilter = useAppSelector(selectors.filterSelector);
  const animatedEdge = useAppSelector(selectors.animatedEdgeSelector);
  const transform = useAppSelector(selectors.flowTransformSelector);
  const primaryNode = GetSelectedNode();
  const defaultZoom = Size.ZOOM_DEFAULT;
  const secondaryNode = project.nodes?.find((x) => x.id === secondaryNodeRef?.id);

  const OnLoad = useCallback((_reactFlowInstance) => {
    return setFlowInstance(_reactFlowInstance);
  }, []);

  const OnElementsRemove = (flowNodesToRemove: Elements) => {
    return hooks.useOnRemove(flowNodesToRemove, inspectorRef, project, setElements, dispatch);
  };

  const OnConnectStart = (e, { nodeId, handleType, handleId }) => {
    return hooks.useOnConnectStart(e, { nodeId, handleType, handleId });
  };

  const OnConnectStop = (e: MouseEvent) => {
    return hooks.useOnConnectStop(e, project, primaryNode, secondaryNode, transform, dispatch);
  };

  const OnConnect = (connection: FlowEdge | Connection) => {
    return hooks.useOnConnect({ connection, project, library, animatedEdge, setElements, dispatch });
  };

  const OnDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const OnNodeDragStop = (_event: React.DragEvent<HTMLDivElement>, activeNode: FlowNode) => {
    return hooks.useOnDragStop(_event, activeNode, dispatch);
  };

  const OnMoveEnd = (flowTransform: FlowTransform) => dispatch(changeFlowTransform(flowTransform));

  const OnDrop = (event: React.DragEvent<HTMLDivElement>) => {
    return hooks.useOnDrop({
      event,
      project,
      user: userState.user,
      icons,
      library,
      secondaryNode: secondaryNodeRef,
      flowTransform: transform,
      reactFlowInstance: flowInstance,
      reactFlowWrapper: flowWrapper,
      dispatch,
    });
  };

  const onSelectionChange = (selectedElements: Elements) => {
    if (selectedElements === null) {
      handleNoSelect(project, inspectorRef, dispatch, true);
    } else if (selectedElements.length === 1 && GetBlockNodeTypes[selectedElements[0]?.type]) {
      handleNodeSelect(selectedElements[0], dispatch, true);
    } else if (selectedElements.length === 1 && GetBlockEdgeTypes[selectedElements[0]?.type]) {
      handleEdgeSelect(selectedElements[0], dispatch, true);
    } else if (selectedElements.length > 1) {
      handleMultiSelect(dispatch, true);
    }
  };

  useEffect(() => {
    CloseInspector(inspectorRef, dispatch);
  }, [inspectorRef, dispatch]);

  // Build initial elements from Project
  useEffect(() => {
    if (!hasRendered && project) {
      setElements(BuildFlowBlockElements(project, primaryNode, secondaryNode, animatedEdge));
      setHasRendered(true);
    }
  }, [project]);

  // Build elements with new nodes
  useEffect(() => {
    if (project) setElements(BuildFlowBlockElements(project, primaryNode, secondaryNode, animatedEdge));
  }, [project?.nodes?.length]);

  useEffect(() => {
    dispatch(updateBlockElements(elements));
  }, [elements, dispatch]);

  useEffect(() => {
    SetInitialEdgeVisibility(project, dispatch);
  }, []);

  return (
    <>
      <div className="reactflow-wrapper" ref={flowWrapper}>
        <ReactFlow
          elements={elements}
          nodeTypes={GetBlockNodeTypes}
          edgeTypes={GetBlockEdgeTypes}
          onConnect={OnConnect}
          onConnectStart={OnConnectStart}
          onConnectStop={OnConnectStop}
          onElementsRemove={OnElementsRemove}
          onLoad={OnLoad}
          onDrop={OnDrop}
          onDragOver={OnDragOver}
          onNodeDragStop={OnNodeDragStop}
          onMoveEnd={OnMoveEnd}
          onlyRenderVisibleElements
          multiSelectionKeyCode={"Control"}
          connectionLineComponent={BlockConnectionLine}
          onSelectionChange={(e) => onSelectionChange(e)}
          deleteKeyCode={"Delete"}
          zoomOnDoubleClick={false}
          defaultZoom={defaultZoom}
          minZoom={0.2}
          maxZoom={3}
          zoomOnScroll
          paneMoveable
        ></ReactFlow>
        {visualFilter && <VisualFilterComponent elements={elements} edgeAnimation={animatedEdge} />}
      </div>
    </>
  );
};

export default FlowBlock;
