/* eslint-disable react-hooks/exhaustive-deps */
import * as selectors from "./helpers/selectors";
import * as hooks from "../hooks/";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { BuildBlockElements } from "./builders";
import { EDGE_TYPE, EdgeType } from "../../../models/project";
import { useAppDispatch, useAppSelector } from "../../../redux/store/hooks";
import { GetBlockEdgeTypes, GetBlockNodeTypes, SetInitialEdgeVisibility } from "./helpers/";
import { VisualFilterComponent } from "../../menus/filterMenu/VisualFilterComponent";
import { BlockConnectionLine } from "./edges/connectionLine/BlockConnectionLine";
import { Size } from "../../../compLibrary/size";
import { GetSelectedNode } from "../../../helpers";
import { CloseInspector, handleEdgeSelect, handleMultiSelect, handleNoSelect, handleNodeSelect } from "../handlers";
import { updateBlockElements } from "../../../modules/explorer/redux/actions";
import { Edge, Project } from "../../../models";
import { changeFlowTransform } from "../../../redux/store/flowTransform/flowTransformSlice";
import ReactFlow, { Elements, Node as FlowNode, Edge as FlowEdge, Connection, FlowTransform } from "react-flow-renderer";

interface Props {
  project: Project;
  inspectorRef: React.MutableRefObject<HTMLDivElement>;
}

/**
 * Component for the Flow library in BlockView
 * @param interface
 * @returns a scene with Flow elements and Mimir nodes, transports and edges.
 */
const FlowBlock = ({ project, inspectorRef }: Props) => {
  const dispatch = useAppDispatch();
  const flowWrapper = useRef(null);
  const [flowInstance, setFlowInstance] = useState(null);
  const [elements, setElements] = useState<Elements>([]);
  const secondaryNode = useAppSelector(selectors.secondaryNodeSelector);
  const icons = useAppSelector(selectors.iconSelector);
  const library = useAppSelector(selectors.librarySelector);
  const userState = useAppSelector(selectors.userStateSelector);
  const visualFilter = useAppSelector(selectors.filterSelector);
  const animatedEdge = useAppSelector(selectors.animatedEdgeSelector);
  const parentNodeSize = useAppSelector(selectors.nodeSizeSelector);
  const transform = useAppSelector(selectors.flowTransformSelector);
  const node = GetSelectedNode();
  const defaultZoom = Size.DEFAULT_ZOOM;

  const OnLoad = useCallback(
    (_reactFlowInstance) => {
      setElements(BuildBlockElements(project, node, secondaryNode, animatedEdge, parentNodeSize));
      return setFlowInstance(_reactFlowInstance);
    },
    [project, node, secondaryNode, animatedEdge, parentNodeSize]
  );

  const OnElementsRemove = (elementsToRemove: Elements) => {
    const nodeToRemove = elementsToRemove[0];
    const edgesToRemove: Edge[] = [];

    project.edges?.forEach((edge) => {
      if (edge.fromNodeId === nodeToRemove?.id || edge.toNodeId === nodeToRemove?.id) edgesToRemove.push(edge);
    });
    return hooks.useOnRemove(elementsToRemove, edgesToRemove, inspectorRef, project, setElements, dispatch);
  };

  const OnConnect = (connection: FlowEdge | Connection) => {
    const edgeType = EDGE_TYPE.BLOCK_TRANSPORT as EdgeType;
    return hooks.useOnConnect({ connection, project, edgeType, library, animatedEdge, setElements, dispatch });
  };

  const OnConnectStart = (e, { nodeId, handleType, handleId }) => {
    return hooks.useOnConnectStart(e, { nodeId, handleType, handleId });
  };

  const OnConnectStop = (e: MouseEvent) => {
    return hooks.useOnConnectStop(e, project, parentNodeSize, secondaryNode, transform, dispatch);
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
      library: library,
      reactFlowInstance: flowInstance,
      reactFlowWrapper: flowWrapper,
      setElements,
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

  useEffect(() => {
    OnLoad(flowInstance);
  }, [OnLoad, flowInstance]);

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
