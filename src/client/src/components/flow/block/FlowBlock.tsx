import ReactFlow, { ReactFlowProvider, Elements, Background } from "react-flow-renderer";
import { useState, useRef, useEffect, useCallback } from "react";
import { FullScreenComponent } from "../../../compLibrary/controls";
import { GetBlockEdgeTypes, OnBlockClick } from "../block/helpers";
import { BuildBlockElements } from "./builders";
import { useOnConnect, useOnDrop, useOnRemove, useOnDragStop } from "../hooks";
import { setActiveBlockNode, setActiveEdge } from "../../../redux/store/project/actions";
import { GetBlockNodeTypes, GetParent } from "../helpers";
import { EDGE_TYPE, EdgeType } from "../../../models/project";
import { useAppDispatch, useAppSelector } from "../../../redux/store/hooks";
import { BlockFilterMenu } from "../../menus/filterMenu/block";
import { Node } from "../../../models";
import { ExplorerModule } from "../../../modules/explorer";
import { BlockConnectionLine } from "./edges";
import { IsOffPage, SetDarkModeColor, GetSelectedNode, IsLocation } from "../../../helpers";
import { LocationModule } from "../../../modules/location";
import {
  darkModeSelector,
  iconSelector,
  electroSelector,
  librarySelector,
  projectSelector,
  secondaryNodeSelector,
  userStateSelector,
  blockFilterSelector,
  nodeSizeSelector,
  animatedEdgeSelector,
  location3DSelector,
} from "../../../redux/store";
import { GetChildren } from "../helpers/GetChildren";

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
  const secondaryNode = useAppSelector(secondaryNodeSelector) as Node;
  const icons = useAppSelector(iconSelector);
  const lib = useAppSelector(librarySelector);
  const electro = useAppSelector(electroSelector);
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

  const OnDrop = (event) => {
    return useOnDrop(
      project,
      event,
      dispatch,
      setElements,
      flowInstance,
      flowWrapper,
      icons,
      lib,
      userState.user,
      parent,
      animatedEdge
    );
  };

  const OnElementClick = (_event, element) => {
    dispatch(setActiveEdge(null, false));
    dispatch(setActiveBlockNode(element.id));
  };

  // Rerender
  useEffect(() => {
    SetDarkModeColor(darkMode);
    OnLoad(flowInstance);
  }, [OnLoad, flowInstance, darkMode, electro]);

  return (
    <ReactFlowProvider>
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
          onElementClick={OnElementClick}
          zoomOnScroll={true}
          paneMoveable={true}
          zoomOnDoubleClick={false}
          defaultZoom={0.9}
          defaultPosition={[450, 80]}
          onClick={(e) => OnBlockClick(e, dispatch, project)}
          onlyRenderVisibleElements={true}
          connectionLineComponent={BlockConnectionLine}
        >
          <Background />
          <FullScreenComponent inspectorRef={inspectorRef} />
        </ReactFlow>

        <ExplorerModule
          elements={elements?.filter((elem) => !IsOffPage(elem?.data))}
          selectedNode={node}
          secondaryNode={secondaryNode}
        />
        {blockFilter && (
          <BlockFilterMenu elements={elements?.filter((elem) => !IsOffPage(elem?.data))} edgeAnimation={animatedEdge} />
        )}
      </div>
      <LocationModule visible={showLocation3D && IsLocation(node)} rootNode={node} nodes={GetChildren(node, project)} />
    </ReactFlowProvider>
  );
};

export default FlowBlock;
