/* eslint-disable react-hooks/exhaustive-deps */
import * as selectors from "./helpers/selectors";
import * as hooks from "./hooks";
import { MutableRefObject, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useAppSelector } from "../../../redux/store/hooks";
import { TreeConnectionLine } from "./edges/connectionLine/TreeConnectionLine";
import { HandleTreeNodeSelection } from "./handlers";
import { Size } from "../../../assets/size/Size";
import { Spinner, SpinnerWrapper } from "../../../compLibrary/spinner/";
import { Dispatch } from "redux";
import ReactFlow, {
  Background,
  Connection,
  Edge as FlowEdge,
  EdgeChange,
  Node as FlowNode,
  NodeChange,
  OnSelectionChangeParams,
  ReactFlowInstance,
} from "react-flow-renderer";
import { GetEdgeTypes, GetNodeTypes } from "../helpers";
import { VisualFilterData, VisualFilterId } from "../../../models/application/VisualFilter";
import { CreateHandleEdge, CreateHandleNode, UpdateHandleEdge } from "../helpers/CreateHandleNode";
import { MimirNode } from "../../../lib/types/MimirNode";
import { MimirEdge } from "../../../lib/types/MimirEdge";
import { MimirProject } from "../../../lib/types/MimirProject";

interface Props {
  inspectorRef: MutableRefObject<HTMLDivElement>;
  dispatch: Dispatch;
  filter: VisualFilterData;
}

/**
 * Component for the Flow library in TreeView.
 * @param interface
 * @returns a canvas with Flow elements and Mimir nodes, edges and transports.
 */
export const FlowTree = ({ inspectorRef, dispatch, filter }: Props) => {
  const flowWrapper = useRef(null);
  const [flowInstance, setFlowInstance] = useState<ReactFlowInstance>(null);
  const [flowNodes, setNodes] = useState<FlowNode[]>([] as FlowNode[]);
  const [flowEdges, setEdges] = useState<FlowEdge[]>([] as FlowEdge[]);
  const [hasRendered, setHasRendered] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const project = new MimirProject(useAppSelector(selectors.projectSelector));
  const user = useAppSelector(selectors.userStateSelector)?.user;
  const terminals = useAppSelector(selectors.terminalsSelector);
  const nodes = project?.nodes.map((node) => new MimirNode(node));
  const edges = project?.edges.map((edge) => new MimirEdge(edge));
  const selectedNode = nodes?.find((n) => n.selected);
  const selectedEdge = edges?.find((e) => e.selected);
  const hasAnimation = filter.filters.find((x) => x.id == VisualFilterId.ANIMATION)?.checked ?? false;

  const OnInit = useCallback((_reactFlowInstance: ReactFlowInstance) => {
    return setFlowInstance(_reactFlowInstance);
  }, []);

  const OnEdgeSplitClick = (id: string, x: number, y: number) => {
    const currentEdge = project.edges.find((x) => x.id === id);
    const handleNode = CreateHandleNode(x, y, currentEdge, dispatch);
    UpdateHandleEdge(currentEdge, handleNode, dispatch);
    CreateHandleEdge(currentEdge, handleNode, dispatch);
  };

  const OnDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const OnNodeDragStop = useCallback(
    (_event: React.DragEvent<HTMLDivElement>, activeNode: FlowNode) => {
      return hooks.useOnDragStop(activeNode, edges, dispatch);
    },
    [edges]
  );

  const OnConnect = (connection: FlowEdge | Connection) => {
    return hooks.useOnTreeConnect({
      connection,
      project,
      setEdges,
      dispatch,
      animatedEdge: hasAnimation,
    });
  };

  const OnDrop = (event: React.DragEvent<HTMLDivElement>) => {
    return hooks.useOnTreeDrop({ event, project, terminals, user, flowInstance, flowWrapper, dispatch });
  };

  const OnSelectionChange = (selectedItems: OnSelectionChangeParams) => {
    if (!project) return;
    return HandleTreeNodeSelection(selectedItems, inspectorRef, dispatch);
  };

  const OnNodesChange = useCallback(
    (changes: NodeChange[]) => {
      return hooks.useOnTreeNodesChange(nodes, edges, changes, setNodes, dispatch, inspectorRef);
    },
    [selectedNode]
  );

  const OnEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      if (!project) return;
      return hooks.useOnTreeEdgesChange(nodes, edges, selectedNode, changes, setEdges, inspectorRef, project, dispatch);
    },
    [selectedEdge]
  );

  // Build initial elements from Project
  useEffect(() => {
    if (!hasRendered && project) {
      setIsFetching(true);
      //TODO: project.toFlownodes in state
      setNodes(project.buildFlowTreeNodes());
      setEdges(project.buildFlowTreeConnections(filter, OnEdgeSplitClick));
      setHasRendered(true);
      setIsFetching(false);
    }
  }, []);

  // Rebuild nodes and edges
  useEffect(() => {
    if (!project) return;
    setNodes(project.buildFlowTreeNodes());
    setEdges(project.buildFlowTreeConnections(filter, OnEdgeSplitClick));
  }, [nodes, edges, selectedNode, filter]);

  return (
    <div className="reactflow-wrapper" ref={flowWrapper}>
      <SpinnerWrapper fetching={isFetching}>
        <Spinner />
      </SpinnerWrapper>

      <ReactFlow
        onInit={OnInit}
        nodes={flowNodes}
        edges={flowEdges}
        onNodesChange={OnNodesChange}
        onEdgesChange={OnEdgesChange}
        onConnect={OnConnect}
        onDrop={OnDrop}
        onDragOver={OnDragOver}
        onNodeDragStop={OnNodeDragStop}
        onNodesDelete={null}
        nodeTypes={useMemo(() => GetNodeTypes, [])}
        edgeTypes={useMemo(() => GetEdgeTypes, [])}
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
