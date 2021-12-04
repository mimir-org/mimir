/* eslint-disable react-hooks/exhaustive-deps */
import * as Helpers from "./helpers/";
import * as Selectors from "./helpers/selectors";
import ReactFlow, { Elements, Background, OnLoadParams } from "react-flow-renderer";
import { useOnConnect, useOnDrop, useOnRemove } from "../hooks";
import { FullScreenComponent } from "../../fullscreen";
import { BuildTreeElements } from "../tree/builders";
import { useState, useRef, useEffect, useCallback } from "react";
import { updatePosition } from "../../../redux/store/project/actions";
import { useAppDispatch, useAppSelector } from "../../../redux/store/hooks";
import { VisualFilterComponent } from "../../menus/filterMenu";
import { TreeConnectionLine } from "./edges";
import { SetDarkModeColor } from "../../../helpers";
import { handleEdgeSelect, handleMultiSelect, handleNodeSelect, handleNoSelect } from "../handlers";

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
  const [flowInstance, setFlowInstance] = useState<OnLoadParams>(null);
  const [elements, setElements] = useState<Elements>();
  const darkMode = useAppSelector(Selectors.darkModeSelector);
  const project = useAppSelector(Selectors.projectSelector);
  const userState = useAppSelector(Selectors.userStateSelector);
  const icons = useAppSelector(Selectors.iconSelector);
  const library = useAppSelector(Selectors.librarySelector);
  const visualFilter = useAppSelector(Selectors.filterSelector);
  const animatedEdge = useAppSelector(Selectors.animatedEdgeSelector);

  const OnDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const OnNodeDragStop = (_event: any, n: any) => dispatch(updatePosition(n.id, n.position.x, n.position.y));

  const OnElementsRemove = (elementsToRemove: any[]) => {
    return useOnRemove(elementsToRemove, setElements, dispatch, inspectorRef);
  };

  const OnLoad = useCallback(
    (_reactFlowInstance: OnLoadParams) => {
      setElements(BuildTreeElements(project, animatedEdge));
      return setFlowInstance(_reactFlowInstance);
    },
    [project, animatedEdge, dispatch]
  );

  const OnConnect = (params) => {
    const fromNode = project.nodes.find((x) => x.id === params.source);
    const fromConnector = fromNode.connectors.find((x) => x.id === params.sourceHandle);
    const edgeType = Helpers.GetEdgeType(fromConnector);
    return useOnConnect(params, project, setElements, dispatch, edgeType, library, animatedEdge);
  };

  const OnDrop = (event: React.DragEvent<HTMLDivElement>) => {
    return useOnDrop({
      event,
      project,
      user: userState.user,
      icons,
      library,
      reactFlowInstance: flowInstance,
      reactFlowWrapper: flowWrapper,
      setElements,
      dispatch,
    });
  };

  const onSelectionChange = (selectedElements: Elements) => {
    if (selectedElements === null) {
      handleNoSelect(project, inspectorRef, dispatch);
    } else if (selectedElements.length === 1 && Helpers.GetNodeTypes[selectedElements[0]?.type]) {
      handleNodeSelect(selectedElements[0], dispatch);
    } else if (selectedElements.length === 1 && Helpers.GetEdgeTypes[selectedElements[0]?.type]) {
      handleEdgeSelect(selectedElements[0], dispatch);
    } else if (selectedElements.length > 1) {
      handleMultiSelect(dispatch);
    }
  };

  // Rerender
  useEffect(() => {
    OnLoad(flowInstance);
  }, [OnLoad, flowInstance]);

  useEffect(() => {
    SetDarkModeColor(darkMode);
  }, [darkMode]);

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
        defaultPosition={[800, 0]}
        zoomOnDoubleClick={false}
        multiSelectionKeyCode={"Control"}
        onSelectionChange={(e) => onSelectionChange(e)}
        connectionLineComponent={TreeConnectionLine}
        deleteKeyCode={"Delete"}
      >
        <Background />
        <FullScreenComponent inspectorRef={inspectorRef} />
      </ReactFlow>
      {visualFilter && <VisualFilterComponent elements={elements} edgeAnimation={animatedEdge} />}
    </>
  );
};

export default FlowTree;
