/* eslint-disable react-hooks/exhaustive-deps */
import * as helpers from "./helpers/";
import * as selectors from "./helpers/selectors";
import { useOnTreeConnect, useOnTreeDrop, useOnTreeRemove } from "./hooks";
import { BuildTreeElements } from "../tree/builders";
import { MutableRefObject, useCallback, useEffect, useRef, useState } from "react";
import { setEdgeVisibility, updatePosition } from "../../../redux/store/project/actions";
import { useAppDispatch, useAppSelector } from "../../../redux/store/hooks";
import { VisualFilterComponent } from "../../menus/filterMenu/VisualFilterComponent";
import { TreeConnectionLine } from "./edges/connectionLine/TreeConnectionLine";
import { handleEdgeSelect, handleMultiSelect, handleNoSelect, handleNodeSelect } from "../handlers";
import { Project } from "../../../models";
import { IsPartOf } from "../helpers";
import { Size } from "../../../compLibrary/size/Size";
import ReactFlow, {
  Background,
  Elements,
  OnLoadParams,
  Edge as FlowEdge,
  Connection,
  Node as FlowNode,
} from "react-flow-renderer";

interface Props {
  project: Project;
  inspectorRef: MutableRefObject<HTMLDivElement>;
}

/**
 * Component for the Flow library in TreeView.
 * @param interface
 * @returns a canvas with Flow elements and Mimir nodes, transports and edges.
 */
const FlowTree = ({ project, inspectorRef }: Props) => {
  const dispatch = useAppDispatch();
  const flowWrapper = useRef(null);
  const [flowInstance, setFlowInstance] = useState<OnLoadParams>(null);
  const [elements, setElements] = useState<Elements>();
  const [hasRendered, setHasRendered] = useState(false);
  const userState = useAppSelector(selectors.userStateSelector);
  const icons = useAppSelector(selectors.iconSelector);
  const library = useAppSelector(selectors.librarySelector);
  const visualFilter = useAppSelector(selectors.filterSelector);
  const animatedEdge = useAppSelector(selectors.animatedEdgeSelector);

  const OnLoad = useCallback((_reactFlowInstance: OnLoadParams) => {
    return setFlowInstance(_reactFlowInstance);
  }, []);

  const OnDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const OnNodeDragStop = (_event: React.DragEvent<HTMLDivElement>, n: FlowNode) =>
    dispatch(updatePosition(n.id, n.position.x, n.position.y));

  const OnElementsRemove = (elementsToRemove: Elements) => {
    return useOnTreeRemove(elementsToRemove, inspectorRef, project, setElements, dispatch);
  };

  const OnConnect = (connection: FlowEdge | Connection) => {
    return useOnTreeConnect({ connection, project, setElements, dispatch, library, animatedEdge });
  };

  const OnDrop = (event: React.DragEvent<HTMLDivElement>) => {
    return useOnTreeDrop({
      event,
      project,
      user: userState.user,
      icons,
      library,
      reactFlowInstance: flowInstance,
      reactFlowWrapper: flowWrapper,
      dispatch,
    });
  };

  const onSelectionChange = (selectedElements: Elements) => {
    if (selectedElements === null) {
      handleNoSelect(project, inspectorRef, dispatch);
    } else if (selectedElements.length === 1 && helpers.GetTreeNodeTypes[selectedElements[0]?.type]) {
      handleNodeSelect(selectedElements[0], dispatch);
    } else if (selectedElements.length === 1 && helpers.GetTreeEdgeTypes[selectedElements[0]?.type]) {
      handleEdgeSelect(selectedElements[0], dispatch);
    } else if (selectedElements.length > 1) {
      handleMultiSelect(dispatch);
    }
  };

  // Build initial elements from Project
  useEffect(() => {
    if (!hasRendered && project) {
      setElements(BuildTreeElements(project, animatedEdge));
      setHasRendered(true);
    }
  }, [project]);

  // Rebuild elements
  useEffect(() => {
    if (project) setElements(BuildTreeElements(project, animatedEdge));
  }, [project, animatedEdge]);

  useEffect(() => {
    project?.edges?.forEach((edge) => {
      if (!IsPartOf(edge.fromConnector)) dispatch(setEdgeVisibility(edge, true));
    });
  }, []);

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
        nodeTypes={helpers.GetTreeNodeTypes}
        edgeTypes={helpers.GetTreeEdgeTypes}
        defaultZoom={0.7}
        minZoom={0.1}
        defaultPosition={[800, Size.BLOCK_MARGIN_Y]}
        zoomOnDoubleClick={false}
        multiSelectionKeyCode={"Control"}
        onSelectionChange={(e) => onSelectionChange(e)}
        connectionLineComponent={TreeConnectionLine}
        deleteKeyCode={"Delete"}
      >
        <Background />
      </ReactFlow>
      {visualFilter && <VisualFilterComponent elements={elements} edgeAnimation={animatedEdge} />}
    </>
  );
};

export default FlowTree;
