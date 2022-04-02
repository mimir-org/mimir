/* eslint-disable react-hooks/exhaustive-deps */
import * as helpers from "./helpers/";
import * as selectors from "./helpers/selectors";
import { useOnTreeConnect, useOnTreeDrop, useOnTreeEdgeDelete, useOnTreeNodeDelete } from "./hooks";
import { BuildTreeFlowNodes, BuildTreeFlowEdges } from "../tree/builders";
import { MutableRefObject, useCallback, useEffect, useRef, useState } from "react";
import { setEdgeVisibility, updatePosition } from "../../../redux/store/project/actions";
import { useAppDispatch, useAppSelector } from "../../../redux/store/hooks";
import { TreeConnectionLine } from "./edges/connectionLine/TreeConnectionLine";
import { HandleNodeSelection } from "../handlers";
import { Project } from "../../../models";
import { Size } from "../../../compLibrary/size/Size";
import { IsPartOfTerminal } from "../helpers/Connectors";
import ReactFlow, {
  Background,
  Edge as FlowEdge,
  Connection,
  Node as FlowNode,
  useNodesState,
  useEdgesState,
  ReactFlowInstance,
  OnSelectionChangeParams,
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
  const [flowInstance, setFlowInstance] = useState<ReactFlowInstance>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [hasRendered, setHasRendered] = useState(false);
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

  const OnNodeDragStop = (_event: React.DragEvent<HTMLDivElement>, n: FlowNode) => {
    dispatch(updatePosition(n.id, n.position.x, n.position.y));
  };

  // const OnNodesChange = useCallback((changes) => setNodes((n) => applyNodeChanges(changes, n)), []);
  // const OnEdgesChange = useCallback((changes) => setEdges((e) => applyEdgeChanges(changes, e)), []);

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
    return useOnTreeDrop({
      event,
      project,
      user,
      icons,
      library,
      flowInstance,
      flowWrapper,
      dispatch,
    });
  };

  const OnSelectionChange = (selectedItems: OnSelectionChangeParams) =>
    HandleNodeSelection(selectedItems, project, inspectorRef, dispatch);

  // Build initial elements from Project
  useEffect(() => {
    if (!hasRendered && project) {
      setNodes(BuildTreeFlowNodes(project));
      setEdges(BuildTreeFlowEdges(project, animatedEdge));
      setHasRendered(true);
    }
  }, [project]);

  // Rebuild elements
  useEffect(() => {
    if (project) {
      setNodes(BuildTreeFlowNodes(project));
      setEdges(BuildTreeFlowEdges(project, animatedEdge));
    }
  }, [project]);

  useEffect(() => {
    project?.edges?.forEach((edge) => {
      if (!IsPartOfTerminal(edge.fromConnector)) dispatch(setEdgeVisibility(edge, true));
    });
  }, []);

  return (
    <div className="reactflow-wrapper" ref={flowWrapper}>
      <ReactFlow
        onInit={OnInit}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodesDelete={OnNodesDelete}
        onEdgesDelete={OnEdgesDelete}
        onConnect={OnConnect}
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
