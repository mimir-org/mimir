import ReactFlow, { ReactFlowProvider, Elements } from "react-flow-renderer";
import { useState, useRef, useEffect, useCallback } from "react";
import { FullScreenComponent } from "../../../compLibrary/controls";
import { GetBlockEdgeTypes, IsBlockView, OnBlockClick } from "../block/helpers";
import { BuildBlockElements } from "./builders";
import { useOnConnect, useOnDrop, useOnRemove, useOnDragStop } from "../hooks";
import { setActiveBlockNode, setActiveEdge } from "../../../redux/store/project/actions";
import { GetSelectedNode, GetBlockNodeTypes, SetDarkModeColor, GetParent } from "../helpers";
import { EDGE_TYPE, EdgeType } from "../../../models/project";
import { useAppDispatch, useAppSelector } from "../../../redux/store/hooks";
import { BlockFilterMenu } from "../../menus/filterMenu/block";
import { Node } from "../../../models";
import { IsDirectChild } from "../../../components/flow/block/helpers";
import { IsFamily } from "../../../components/flow/helpers";

import {
  darkModeSelector,
  iconSelector,
  electroSelector,
  librarySelector,
  mainConnectSelector,
  projectSelector,
  secondaryNodeSelector,
  userStateSelector,
  blockFilterSelector,
} from "../../../redux/store";
import { ExplorerModule } from "../../../modules/explorer";

/**
 * Component for the Flow library in BlockView
 * @returns a scene with Flow elements and Mimir nodes, transports and edges.
 */
const FlowBlock = () => {
  const dispatch = useAppDispatch();
  const flowWrapper = useRef(null);
  const [flowInstance, setFlowInstance] = useState(null);
  const [elements, setElements] = useState<Elements>();
  const darkMode = useAppSelector(darkModeSelector);
  const project = useAppSelector(projectSelector);
  const secondaryNode = useAppSelector(secondaryNodeSelector) as Node;
  const mainConnectNodes = useAppSelector(mainConnectSelector);
  const icons = useAppSelector(iconSelector);
  const lib = useAppSelector(librarySelector);
  const electro = useAppSelector(electroSelector);
  const userState = useAppSelector(userStateSelector);
  const blockFilter = useAppSelector(blockFilterSelector);
  const node = GetSelectedNode();
  const parent = GetParent(node);

  const OnLoad = useCallback(
    (_reactFlowInstance) => {
      setElements(BuildBlockElements(project, node, secondaryNode, mainConnectNodes, parent));
      return setFlowInstance(_reactFlowInstance);
    },
    [project, node, secondaryNode, mainConnectNodes, parent]
  );

  const OnElementsRemove = (elementsToRemove) => {
    const nodeToRemove = elementsToRemove[0];
    project.edges?.forEach((edge) => {
      if (edge.fromNodeId === nodeToRemove.id || edge.toNodeId === nodeToRemove.id) elementsToRemove.push(edge);
    });
    return useOnRemove(elementsToRemove, setElements, dispatch);
  };

  const OnConnect = (params) => {
    return useOnConnect(params, project, setElements, dispatch, EDGE_TYPE.BLOCK as EdgeType, lib);
  };

  const OnDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const OnNodeDragStop = (_event, activeNode) => {
    return useOnDragStop(_event, activeNode, dispatch);
  };

  const OnDrop = (event) => {
    return useOnDrop(project, event, dispatch, setElements, flowInstance, flowWrapper, icons, lib, userState.user, parent);
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

  // Hide unselected nodes on first render
  useEffect(() => {
    project?.nodes.forEach((n) => {
      n.isHidden = true;
    });

    project?.nodes.forEach((n) => {
      if (n?.id === node?.id) n.isHidden = false;
      if (IsDirectChild(n, node) && IsFamily(n, node)) n.isHidden = false;
    });
  }, []);

  return (
    <>
      {IsBlockView() && (
        <ReactFlowProvider>
          <div className="reactflow-wrapper" ref={flowWrapper}>
            <ReactFlow
              elements={elements}
              nodeTypes={GetBlockNodeTypes}
              edgeTypes={GetBlockEdgeTypes}
              onConnect={OnConnect}
              onElementsRemove={OnElementsRemove}
              onLoad={OnLoad}
              onDrop={OnDrop}
              onDragOver={OnDragOver}
              onNodeDragStop={OnNodeDragStop}
              onElementClick={OnElementClick}
              zoomOnScroll={true}
              paneMoveable={true}
              zoomOnDoubleClick={false}
              defaultZoom={0.7}
              snapToGrid={true}
              snapGrid={[5, 5]}
              defaultPosition={[1600, 900]}
              onClick={(e) => OnBlockClick(e, dispatch, project)}
              onlyRenderVisibleElements={true}
            >
              <FullScreenComponent />
            </ReactFlow>

            <ExplorerModule elements={elements} />
            {blockFilter && <BlockFilterMenu elements={elements} />}
          </div>
        </ReactFlowProvider>
      )}
    </>
  );
};

export default FlowBlock;
