import ReactFlow, { ReactFlowProvider, Elements, Background } from "react-flow-renderer";
import { useState, useRef, useEffect, useCallback } from "react";
import { FullScreenComponent } from "../../../compLibrary/controls";
import { Color, Size } from "../../../compLibrary";
import { BackgroundBox } from "./styled";
import { changeInspectorTab } from "../../../modules/inspector/redux/tabs/actions";
import { GetBlockEdgeTypes, IsBlockView, OnBlockClick } from "../block/helpers";
import { BuildBlockElements } from "./builders";
import { useOnConnect, useOnDrop, useOnRemove, useOnDragStop } from "../hooks";
import { setModuleVisibility } from "../../../redux/store/modules/actions";
import { setActiveBlockNode, setActiveEdge } from "../../../redux/store/project/actions";
import { GetSelectedNode, GetBlockNodeTypes, IsLocation, SetDarkModeColor } from "../helpers";
import { EDGE_TYPE, EdgeType, BackgroundVariant, MODULE_TYPE } from "../../../models/project";
import { changeInspectorHeight } from "../../../modules/inspector/redux/height/actions";
import { SetPanelHeight } from "../../../modules/inspector/helpers";
import { SetSplitViewBackground } from "./helpers";
import {
  inspectorOpenSelector,
  useAppSelector,
  darkModeSelector,
  iconSelector,
  isElectroVisibleSelector,
  librarySelector,
  mainConnectNodesSelector,
  projectSelector,
  splitViewNodeSelector,
  splitViewSelector,
  useAppDispatch,
  userStateSelector,
} from "../../../redux/store";

/**
 * Component for the Flow library in BlockView
 * @returns a scene with Flow elements and Mimir nodes, transports and edges.
 */
const FlowBlock = () => {
  const dispatch = useAppDispatch();
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [elements, setElements] = useState<Elements>();
  const darkMode = useAppSelector(darkModeSelector);
  const project = useAppSelector(projectSelector);
  const splitView = useAppSelector(splitViewSelector);
  const splitViewNode = useAppSelector(splitViewNodeSelector);
  const mainConnectNodes = useAppSelector(mainConnectNodesSelector);
  const icons = useAppSelector(iconSelector);
  const library = useAppSelector(librarySelector);
  const inspectorOpen = useAppSelector(inspectorOpenSelector);
  const electro = useAppSelector(isElectroVisibleSelector);
  const userState = useAppSelector(userStateSelector);
  const node = GetSelectedNode();
  const showBackground = IsLocation(splitViewNode) || IsLocation(node);

  const OnLoad = useCallback(
    (_reactFlowInstance) => {
      setElements(BuildBlockElements(project, node, splitView, splitViewNode, mainConnectNodes));
      return setReactFlowInstance(_reactFlowInstance);
    },
    [project, node, splitView, splitViewNode, mainConnectNodes]
  );

  const OnElementsRemove = (elementsToRemove) => {
    const nodeToRemove = elementsToRemove[0];
    project.edges?.forEach((edge) => {
      if (edge.fromNodeId === nodeToRemove.id || edge.toNodeId === nodeToRemove.id) elementsToRemove.push(edge);
    });
    return useOnRemove(elementsToRemove, setElements, dispatch);
  };

  const OnConnect = (params) => {
    return useOnConnect(params, project, setElements, dispatch, EDGE_TYPE.BLOCK as EdgeType, library);
  };

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
      reactFlowInstance,
      reactFlowWrapper,
      icons,
      library,
      userState.user
    );
  };

  const OnElementClick = (_event, element) => {
    dispatch(setActiveEdge(null, false));
    dispatch(setActiveBlockNode(element.id));
    dispatch(setModuleVisibility(MODULE_TYPE.INSPECTOR, true, true));
    dispatch(changeInspectorTab(0));

    if (!inspectorOpen) {
      dispatch(changeInspectorHeight(Size.ModuleOpen));
      SetPanelHeight(Size.ModuleOpen);
    }
  };

  // Rerender
  useEffect(() => {
    SetDarkModeColor(darkMode);
    OnLoad(reactFlowInstance);
  }, [OnLoad, reactFlowInstance, darkMode, electro]);

  return (
    <>
      {IsBlockView() && (
        <ReactFlowProvider>
          <div className="reactflow-wrapper" ref={reactFlowWrapper}>
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
              zoomOnScroll={false}
              paneMoveable={false}
              zoomOnDoubleClick={false}
              onClick={(e) => OnBlockClick(e, dispatch, project)}
              onlyRenderVisibleElements={true}
            >
              <FullScreenComponent />
              <BackgroundBox
                visible={showBackground}
                splitView={splitView}
                right={SetSplitViewBackground(node, splitViewNode)}
              >
                <Background size={0.5} color={Color.Grey} variant={BackgroundVariant.Lines} />
              </BackgroundBox>
            </ReactFlow>
          </div>
        </ReactFlowProvider>
      )}
    </>
  );
};

export default FlowBlock;
