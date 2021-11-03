import * as Helpers from "./helpers/";
import ReactFlow, { ReactFlowProvider, Elements } from "react-flow-renderer";
import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { useOnConnect, useOnDrop, useOnRemove } from "../hooks";
import { FullScreenComponent } from "../../../compLibrary/controls";
import { changeInspectorTab } from "../../../modules/inspector/redux/tabs/actions";
import { GetParent, GetSelectedNode, SetDarkModeColor } from "../helpers";
import { BuildTreeElements } from "../tree/builders";
import { updatePosition } from "../../../redux/store/project/actions";
import FlowManipulator from "./FlowManipulator";
import { handleEdgeSelect, handleNoSelect, handleNodeSelect } from "./handlers/";
import { useAppDispatch, useAppSelector } from "../../../redux/store/hooks";
import { TreeFilterMenu } from "../../menus/filterMenu/tree";
import { ExplorerModule } from "../../../modules/explorer";
import {
  animatedEdgeSelector,
  darkModeSelector,
  iconSelector,
  inspectorSelector,
  librarySelector,
  projectSelector,
  treeFilterSelector,
  userStateSelector,
} from "../../../redux/store";

interface Props {
  inspectorRef: React.MutableRefObject<HTMLDivElement>;
}

/**
 * Component for the Flow library in TreeView
 * @returns a scene with Flow elements and Mimir nodes, transports and edges.
 */
const FlowTree = ({ inspectorRef }: Props) => {
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
  const animatedEdge = useAppSelector(animatedEdgeSelector);
  const node = GetSelectedNode();
  const parent = GetParent(node);
  const selectedIds = useMemo(() => elements?.filter((ele) => ele.data.isSelected).map((ele) => ele.id) ?? [], [elements]);

  const OnDragOver = (event: any) => event.preventDefault();
  const OnNodeDragStop = (_event: any, n: any) => dispatch(updatePosition(n.id, n.position.x, n.position.y));

  const OnElementsRemove = (elementsToRemove: any[]) => {
    return useOnRemove(elementsToRemove, setElements, dispatch, inspectorRef);
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
    return useOnConnect(params, project, setElements, dispatch, edgeType, library, animatedEdge);
  };

  const OnDrop = (event) => {
    return useOnDrop(project, event, dispatch, setElements, flowInstance, flowWrapper, icons, library, userState.user, parent);
  };

  const onSelectionChange = (_elements: Elements) => {
    if (_elements === null) {
      handleNoSelect(inspectorRef, dispatch);
    } else if (_elements.length === 1 && Helpers.GetNodeTypes[_elements[0]?.type]) {
      handleNodeSelect(_elements[0], inspectorOpen, inspectorRef, dispatch);
    } else if (_elements.length === 1 && Helpers.GetEdgeTypes[_elements[0]?.type]) {
      handleEdgeSelect(_elements[0], project, dispatch);
    }
  };

  // Rerender
  useEffect(() => {
    SetDarkModeColor(darkMode);
    OnLoad(flowInstance);
  }, [OnLoad, flowInstance, darkMode]);

  return (
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
        nodeTypes={Helpers.GetNodeTypes}
        edgeTypes={Helpers.GetEdgeTypes}
        defaultZoom={0.7}
        defaultPosition={[800, 100]}
        zoomOnDoubleClick={false}
        multiSelectionKeyCode={"Control"}
        onSelectionChange={(e) => onSelectionChange(e)}
      >
        <FullScreenComponent inspectorRef={inspectorRef} />
        <FlowManipulator elements={elements} selectedIds={selectedIds} />
      </ReactFlow>
      <ExplorerModule elements={elements} />
      {treeFilter && <TreeFilterMenu elements={elements} edgeAnimation={animatedEdge} />}
    </ReactFlowProvider>
  );
};

export default FlowTree;
