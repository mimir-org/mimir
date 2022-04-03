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
import { CloseInspector, OnSelectionChange } from "../handlers";
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
  const secondaryNodeRef = useAppSelector(selectors.secondaryNodeSelector);
  const icons = useAppSelector(selectors.iconSelector);
  const library = useAppSelector(selectors.librarySelector);
  const user = useAppSelector(selectors.userStateSelector)?.user;
  const visualFilter = useAppSelector(selectors.filterSelector);
  const animatedEdge = useAppSelector(selectors.animatedEdgeSelector);
  const flowTransform = useAppSelector(selectors.flowTransformSelector);
  const primaryNode = GetSelectedNode();
  const defaultZoom = Size.ZOOM_DEFAULT;
  const secondaryNode = project.nodes?.find((x) => x.id === secondaryNodeRef?.id);

  const OnLoad = useCallback(
    (_reactFlowInstance) => {
      setElements(BuildFlowBlockElements(project, primaryNode, secondaryNode, animatedEdge));
      return setFlowInstance(_reactFlowInstance);
    },
    [project, primaryNode, secondaryNode, animatedEdge]
  );

  const OnElementsRemove = (flowNodesToRemove: Elements) => {
    return hooks.useOnRemove(flowNodesToRemove, inspectorRef, project, setElements, dispatch);
  };

  const OnConnectStart = (e, { nodeId, handleType, handleId }) => {
    return hooks.useOnConnectStart(e, { nodeId, handleType, handleId });
  };

  const OnConnectStop = (e: MouseEvent) => {
    return hooks.useOnConnectStop(e, project, primaryNode, secondaryNode, flowTransform, dispatch);
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

  const OnMoveEnd = (transform: FlowTransform) => dispatch(changeFlowTransform(transform));

  const OnDrop = (event: React.DragEvent<HTMLDivElement>) => {
    return hooks.useOnDrop({
      event,
      project,
      user,
      icons,
      library,
      secondaryNodeRef,
      flowTransform,
      flowInstance,
      flowWrapper,
      dispatch,
    });
  };

  const onSelectionChange = (selectedElements: Elements) => OnSelectionChange(selectedElements, project, inspectorRef, dispatch);

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
