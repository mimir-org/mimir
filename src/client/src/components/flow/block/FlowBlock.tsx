import ReactFlow, { Elements } from "react-flow-renderer";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { FullScreenComponent } from "../../fullscreen";
import { GetBlockEdgeTypes } from "../block/helpers";
import { BuildBlockElements } from "./builders";
import { useOnConnect, useOnDrop, useOnRemove, useOnDragStop } from "../hooks";
import { GetBlockNodeTypes, GetParent } from "../helpers";
import { EDGE_TYPE, EdgeType } from "../../../models/project";
import { useAppDispatch, useAppSelector } from "../../../redux/store/hooks";
import { BlockFilterMenu } from "../../menus/filterMenu/";
import { BlockConnectionLine } from "./edges";
import { IsOffPage, SetDarkModeColor, GetSelectedNode, IsLocation } from "../../../helpers";
import { LocationModule } from "../../../modules/location";
import { CloseInspector, handleEdgeSelect, handleMultiSelect, handleNodeSelect, handleNoSelect } from "../handlers";
import { updateBlockElements } from "../../../modules/explorer/redux/actions";
import { GetChildren } from "../helpers/GetChildren";
import {
  iconSelector,
  darkModeSelector,
  librarySelector,
  projectSelector,
  secondaryNodeSelector,
  userStateSelector,
  blockFilterSelector,
  nodeSizeSelector,
  animatedEdgeSelector,
  location3DSelector,
} from "../../../redux/store";

interface Props {
  inspectorRef: React.MutableRefObject<HTMLDivElement>;
}

/**
 * Component for the Flow library in BlockView
 * @returns a scene with Flow elements and Mimir nodes, transports and edges.
 */
const FlowBlock = ({ inspectorRef }: Props) => {
  const dispatch = useAppDispatch();
  const flowWrapper = useRef(null);
  const [flowInstance, setFlowInstance] = useState(null);
  const [elements, setElements] = useState<Elements>();
  const darkMode = useAppSelector(darkModeSelector);
  const project = useAppSelector(projectSelector);
  const secondaryNode = useAppSelector(secondaryNodeSelector);
  const icons = useAppSelector(iconSelector);
  const lib = useAppSelector(librarySelector);
  const userState = useAppSelector(userStateSelector);
  const blockFilter = useAppSelector(blockFilterSelector);
  const parentNodeSize = useAppSelector(nodeSizeSelector);
  const animatedEdge = useAppSelector(animatedEdgeSelector);
  const showLocation3D = useAppSelector(location3DSelector);

  const node = GetSelectedNode();
  const parent = GetParent(node);

  const OnLoad = useCallback(
    (_reactFlowInstance) => {
      setElements(BuildBlockElements(project, node, secondaryNode, parent, parentNodeSize, animatedEdge));
      return setFlowInstance(_reactFlowInstance);
    },
    [project, node, secondaryNode, parent, parentNodeSize, animatedEdge]
  );

  const OnElementsRemove = (elementsToRemove) => {
    const nodeToRemove = elementsToRemove[0];
    project.edges?.forEach((edge) => {
      if (edge.fromNodeId === nodeToRemove.id || edge.toNodeId === nodeToRemove.id) elementsToRemove.push(edge);
    });
    return useOnRemove(elementsToRemove, setElements, dispatch, inspectorRef);
  };

  const OnConnect = (params) => {
    return useOnConnect(params, project, setElements, dispatch, EDGE_TYPE.BLOCK as EdgeType, lib, animatedEdge);
  };

  // const OnConnectStart = (e, { nodeId, handleType, handleId }) => {
  //   return useOnConnectStart(e, { nodeId, handleType, handleId });
  // };

  // const OnConnectStop = (e) => {
  //   return useOnConnectStop(e, project, dispatch);
  // };

  const OnDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const OnNodeDragStop = (_event, activeNode) => {
    return useOnDragStop(_event, activeNode, dispatch);
  };

  const OnDrop = (event: React.DragEvent<HTMLDivElement>) => {
    return useOnDrop({
      event,
      project,
      user: userState.user,
      icons,
      library: lib,
      reactFlowInstance: flowInstance,
      reactFlowWrapper: flowWrapper,
      setElements,
      dispatch,
    });
  };

  useEffect(() => {
    CloseInspector(inspectorRef, dispatch);
  }, [inspectorRef, dispatch]);

  // Rerender
  useEffect(() => {
    OnLoad(flowInstance);
  }, [OnLoad, flowInstance]);

  useEffect(() => {
    dispatch(updateBlockElements(elements));
  }, [elements, dispatch]);

  useEffect(() => {
    SetDarkModeColor(darkMode);
  }, [darkMode]);

  const onSelectionChange = (selectedElements: Elements) => {
    if (selectedElements === null) {
      handleNoSelect(project, inspectorRef, dispatch, true);
    } else if (selectedElements.length === 1 && GetBlockNodeTypes[selectedElements[0]?.type]) {
      handleNodeSelect(selectedElements[0], false, inspectorRef, dispatch, true);
    } else if (selectedElements.length === 1 && GetBlockEdgeTypes[selectedElements[0]?.type]) {
      handleEdgeSelect(selectedElements[0], false, inspectorRef, dispatch, true);
    } else if (selectedElements.length > 1) {
      handleMultiSelect(dispatch, true);
    }
  };

  return (
    <div className="reactflow-wrapper" ref={flowWrapper}>
      <ReactFlow
        elements={elements}
        nodeTypes={GetBlockNodeTypes}
        edgeTypes={GetBlockEdgeTypes}
        onConnect={OnConnect}
        // onConnectStart={OnConnectStart}
        // onConnectStop={OnConnectStop}
        onElementsRemove={OnElementsRemove}
        onLoad={OnLoad}
        onDrop={OnDrop}
        onDragOver={OnDragOver}
        onNodeDragStop={OnNodeDragStop}
        zoomOnScroll={true}
        paneMoveable={true}
        zoomOnDoubleClick={false}
        defaultZoom={0.9}
        defaultPosition={[450, 80]}
        onlyRenderVisibleElements={true}
        multiSelectionKeyCode={"Control"}
        connectionLineComponent={BlockConnectionLine}
        onSelectionChange={(e) => onSelectionChange(e)}
      >
        <FullScreenComponent inspectorRef={inspectorRef} />
      </ReactFlow>

      {blockFilter && (
        <BlockFilterMenu elements={elements?.filter((elem) => !IsOffPage(elem?.data))} edgeAnimation={animatedEdge} />
      )}
      <LocationModule visible={showLocation3D && IsLocation(node)} rootNode={node} nodes={GetChildren(node, project)} />
    </div>
  );
};

export default FlowBlock;
