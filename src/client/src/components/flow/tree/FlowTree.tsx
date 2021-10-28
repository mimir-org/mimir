import * as Helpers from "./helpers/";
import ReactFlow, { ReactFlowProvider, Elements } from "react-flow-renderer";
import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { useOnConnect, useOnDrop, useOnRemove } from "../hooks";
import { FullScreenComponent } from "../../../compLibrary/controls";
import { Size } from "../../../compLibrary";
import { IsBlockView } from "../block/helpers";
import { changeInspectorTab } from "../../../modules/inspector/redux/tabs/actions";
import { GetParent, GetSelectedNode, SetDarkModeColor } from "../helpers";
import { BuildTreeElements } from "../tree/builders";
import { setModuleVisibility } from "../../../redux/store/modules/actions";
import { MODULE_TYPE } from "../../../models/project";
import { getBlobData } from "../../../typeEditor/redux/actions";
import { SetPanelHeight } from "../../../modules/inspector/helpers";
import { updatePosition, setActiveNode, setActiveEdge, setActiveBlockNode } from "../../../redux/store/project/actions";
import { changeInspectorHeight } from "../../../modules/inspector/redux/height/actions";
import { FlowManipulator } from "./FlowManipulator";
import { OnTreeClick } from "./handlers/";
import { useAppDispatch, useAppSelector } from "../../../redux/store/hooks";
import { TreeFilterMenu } from "../../menus/filterMenu/tree";
import { ExplorerModule } from "../../../modules/explorer";
import {
  darkModeSelector,
  iconSelector,
  inspectorSelector,
  librarySelector,
  projectSelector,
  treeFilterSelector,
  userStateSelector,
} from "../../../redux/store";

/**
 * Component for the Flow library in TreeView
 * @returns a scene with Flow elements and Mimir nodes, transports and edges.
 */
const FlowTree = () => {
  const dispatch = useAppDispatch();
  const flowWrapper = useRef(null);
  const [flowInstance, setFlowInstance] = useState(null);
  const [elements, setElements] = useState<Elements>();
  const darkMode = useAppSelector(darkModeSelector);
  const project = useAppSelector(projectSelector);
  const userState = useAppSelector(userStateSelector);
  const icons = useAppSelector(iconSelector);
  const library = useAppSelector(librarySelector);
  const inspectorOpen = useAppSelector(inspectorSelector);
  const treeFilter = useAppSelector(treeFilterSelector);
  const node = GetSelectedNode();
  const parent = GetParent(node);
  const selectedNodeId = useMemo(() => node?.id ?? project?.edges.find((edge) => edge.isSelected)?.id, [project, node]);

  const OnDragOver = (event: any) => event.preventDefault();
  const OnNodeDragStop = (_event: any, n: any) => dispatch(updatePosition(n.id, n.position.x, n.position.y));

  const OnElementsRemove = (elementsToRemove: any[]) => {
    return useOnRemove(elementsToRemove, setElements, dispatch);
  };

  const OnLoad = useCallback(
    (_reactFlowInstance) => {
      setElements(BuildTreeElements(project));
      return setFlowInstance(_reactFlowInstance);
    },
    [project]
  );

  const OnConnect = (params) => {
    const fromNode = project.nodes.find((x) => x.id === params.source);
    const fromConnector = fromNode.connectors.find((x) => x.id === params.sourceHandle);
    const edgeType = Helpers.GetEdgeType(fromConnector);
    return useOnConnect(params, project, setElements, dispatch, edgeType, library);
  };

  const OnDrop = (event) => {
    return useOnDrop(project, event, dispatch, setElements, flowInstance, flowWrapper, icons, library, userState.user, parent);
  };

  const OnElementClick = (_event, element) => {
    dispatch(setActiveEdge(null, false));
    dispatch(setActiveNode(element.id, true));
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
    OnLoad(flowInstance);
  }, [OnLoad, flowInstance, darkMode]);

  // Get symbols from TypeEditor
  useEffect(() => {
    dispatch(getBlobData());
  }, [dispatch]);

  return (
    <>
      {!IsBlockView() && (
        <ReactFlowProvider>
          <div className="reactflow-wrapper" ref={flowWrapper}></div>
          <ReactFlow
            elements={elements}
            onConnect={OnConnect}
            onElementsRemove={OnElementsRemove}
            onLoad={OnLoad}
            onDrop={OnDrop}
            onDragOver={OnDragOver}
            onNodeDragStop={OnNodeDragStop}
            onElementClick={OnElementClick}
            nodeTypes={Helpers.GetNodeTypes}
            edgeTypes={Helpers.GetEdgeTypes}
            defaultZoom={0.7}
            defaultPosition={[700, 150]}
            zoomOnDoubleClick={false}
            onClick={(e) => OnTreeClick(e, dispatch, project)}
          >
            <FullScreenComponent />
            <FlowManipulator elements={elements} selectedId={selectedNodeId} />
          </ReactFlow>
          <ExplorerModule elements={elements} />
          {treeFilter && <TreeFilterMenu elements={elements} />}
        </ReactFlowProvider>
      )}
    </>
  );
};

export default FlowTree;
