import * as Helpers from "./helpers/";
import ReactFlow, { Elements, Background } from "react-flow-renderer";
import { useOnConnect, useOnDrop, useOnRemove } from "../hooks";
import { FullScreenComponent } from "../../../compLibrary/controls";
import { GetParent } from "../helpers";
import { BuildTreeElements } from "../tree/builders";
import { useState, useRef, useEffect, useCallback } from "react";
import { updatePosition } from "../../../redux/store/project/actions";
import { useAppDispatch, useAppSelector } from "../../../redux/store/hooks";
import { TreeFilterMenu } from "../../menus/filterMenu/tree";
import { TreeConnectionLine } from "./edges";
import { GetSelectedNode, SetDarkModeColor } from "../../../helpers";
import { handleEdgeSelect, handleMultiSelect, handleNodeSelect, handleNoSelect } from "../handlers";
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

  const OnDragOver = (event: any) => event.preventDefault();
  const OnNodeDragStop = (_event: any, n: any) => dispatch(updatePosition(n.id, n.position.x, n.position.y));

  const OnElementsRemove = (elementsToRemove: any[]) => {
    return useOnRemove(elementsToRemove, setElements, dispatch, inspectorRef);
  };

  const OnLoad = useCallback(
    (_reactFlowInstance) => {
      setElements(BuildTreeElements(project, animatedEdge));
      return setFlowInstance(_reactFlowInstance);
    },
    [project, animatedEdge]
  );

  const OnConnect = (params) => {
    const fromNode = project.nodes.find((x) => x.id === params.source);
    const fromConnector = fromNode.connectors.find((x) => x.id === params.sourceHandle);
    const edgeType = Helpers.GetEdgeType(fromConnector);
    return useOnConnect(params, project, setElements, dispatch, edgeType, library, animatedEdge);
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
      library,
      userState.user,
      parent,
      animatedEdge
    );
  };

  const onSelectionChange = (selectedElements: Elements) => {
    if (selectedElements === null) {
      handleNoSelect(project, inspectorRef, dispatch);
    } else if (selectedElements.length === 1 && Helpers.GetNodeTypes[selectedElements[0]?.type]) {
      handleNodeSelect(selectedElements[0], inspectorOpen, inspectorRef, dispatch);
    } else if (selectedElements.length === 1 && Helpers.GetEdgeTypes[selectedElements[0]?.type]) {
      handleEdgeSelect(selectedElements[0], inspectorOpen, inspectorRef, dispatch);
    } else if (selectedElements.length > 1) {
      handleMultiSelect(dispatch);
    }
  };

  // Rerender
  useEffect(() => {
    SetDarkModeColor(darkMode);
    OnLoad(flowInstance);
  }, [OnLoad, flowInstance, darkMode]);

  return (
    <>
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
        connectionLineComponent={TreeConnectionLine}
      >
        <Background />
        <FullScreenComponent inspectorRef={inspectorRef} />
      </ReactFlow>

      {treeFilter && <TreeFilterMenu elements={elements} edgeAnimation={animatedEdge} />}
    </>
  );
};

export default FlowTree;
