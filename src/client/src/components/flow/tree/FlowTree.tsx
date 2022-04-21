/* eslint-disable react-hooks/exhaustive-deps */
import * as selectors from "./helpers/selectors";
import { useOnTreeConnect, useOnTreeDrop, useOnTreeEdgeDelete, useOnTreeNodeDelete } from "./hooks";
import { BuildFlowTreeNodes, BuildFlowTreeEdges } from "../tree/builders";
import { MutableRefObject, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { updatePosition } from "../../../redux/store/project/actions";
import { useAppDispatch, useAppSelector } from "../../../redux/store/hooks";
import { TreeConnectionLine } from "./edges/connectionLine/TreeConnectionLine";
import { HandleTreeNodeSelection } from "./handlers";
import { Size } from "../../../compLibrary/size/Size";
import { GetTreeEdgeTypes, GetTreeNodeTypes, SetInitialEdgeVisibility } from "./helpers/";
import { Spinner, SpinnerWrapper } from "../../../compLibrary/spinner/Spinner";
import ReactFlow, {
  Background,
  Edge as FlowEdge,
  Connection,
  Node as FlowNode,
  useNodesState,
  useEdgesState,
  ReactFlowInstance,
  OnSelectionChangeParams,
  applyNodeChanges,
  applyEdgeChanges,
  NodeChange,
  EdgeChange,
} from "react-flow-renderer";

interface Props {
  inspectorRef: MutableRefObject<HTMLDivElement>;
}

/**
 * Component for the Flow library in TreeView.
 * @param interface
 * @returns a canvas with Flow elements and Mimir nodes, transports and edges.
 */
export const FlowTree = ({ inspectorRef }: Props) => {
  const dispatch = useAppDispatch();
  const flowWrapper = useRef(null);
  const [flowInstance, setFlowInstance] = useState<ReactFlowInstance>(null);
  const [nodes, setNodes] = useNodesState([]);
  const [edges, setEdges] = useEdgesState([]);
  const [hasRendered, setHasRendered] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const project = useAppSelector(selectors.projectSelector);
  const user = useAppSelector(selectors.userStateSelector)?.user;
  const icons = useAppSelector(selectors.iconSelector);
  const library = useAppSelector(selectors.librarySelector);
  const animatedEdge = useAppSelector(selectors.animatedEdgeSelector);

  const OnInit = useCallback((_reactFlowInstance: ReactFlowInstance) => {
    return setFlowInstance(_reactFlowInstance);
  }, []);

  const OnDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const OnNodeDragStop = (_event: React.DragEvent<HTMLDivElement>, n: FlowNode) =>
    dispatch(updatePosition(n.id, n.position.x, n.position.y));

  const OnNodesDelete = (nodesToDelete: FlowNode[]) => {
    return useOnTreeNodeDelete(nodesToDelete, inspectorRef, project, dispatch);
  };

  const OnEdgesDelete = (edgesToDelete: FlowEdge[]) => {
    return useOnTreeEdgeDelete(edgesToDelete, inspectorRef, project, dispatch);
  };

  const OnConnect = (connection: FlowEdge | Connection) => {
    return useOnTreeConnect({ connection, project, setEdges, dispatch, library, animatedEdge });
  };

  const OnDrop = (event: React.DragEvent<HTMLDivElement>) => {
    return useOnTreeDrop({ event, project, user, icons, library, flowInstance, flowWrapper, dispatch });
  };

  const OnSelectionChange = (selectedItems: OnSelectionChangeParams) =>
    HandleTreeNodeSelection(selectedItems, project, inspectorRef, dispatch);

  const OnNodesChange = useCallback((changes: NodeChange[]) => setNodes((n) => applyNodeChanges(changes, n)), []);
  const OnEdgesChange = useCallback((changes: EdgeChange[]) => setEdges((e) => applyEdgeChanges(changes, e)), []);

  // Build initial elements from Project
  useEffect(() => {
    if (!hasRendered && project) {
      setIsFetching(true);
      setNodes(BuildFlowTreeNodes(project));
      setEdges(BuildFlowTreeEdges(project, animatedEdge));
      setHasRendered(true);
      setIsFetching(false);
    }
  }, [project]);

  // Rebuild nodes
  useEffect(() => {
    if (!project) return;
    setNodes(BuildFlowTreeNodes(project));
  }, [project?.nodes?.length]);

  // Rebuild edges
  useEffect(() => {
    if (!project) return;
    setEdges(BuildFlowTreeEdges(project, animatedEdge));
  }, [project?.edges, animatedEdge]);

  // Show only partOf edges by default
  useEffect(() => {
    setIsFetching(true);
    SetInitialEdgeVisibility(project?.edges, dispatch);
    setIsFetching(false);
  }, []);

  return (
    <div className="reactflow-wrapper" ref={flowWrapper}>
      <SpinnerWrapper fetching={isFetching}>
        <Spinner />
      </SpinnerWrapper>

      <ReactFlow
        onInit={OnInit}
        nodes={nodes}
        edges={edges}
        onNodesChange={OnNodesChange}
        onEdgesChange={OnEdgesChange}
        onNodesDelete={OnNodesDelete}
        onEdgesDelete={OnEdgesDelete}
        onConnect={OnConnect}
        onDrop={OnDrop}
        onDragOver={OnDragOver}
        onNodeDragStop={OnNodeDragStop}
        nodeTypes={useMemo(() => GetTreeNodeTypes, [])}
        edgeTypes={useMemo(() => GetTreeEdgeTypes, [])}
        defaultZoom={0.7}
        minZoom={0.1}
        defaultPosition={[window.innerWidth / 3, Size.BLOCK_MARGIN_Y]}
        zoomOnDoubleClick={false}
        multiSelectionKeyCode={"Control"}
        onSelectionChange={(e) => OnSelectionChange(e)}
        connectionLineComponent={TreeConnectionLine}
        deleteKeyCode={"Delete"}
      >
        <Background />
      </ReactFlow>
    </div>
  );
};

export default FlowTree;
