import { forwardRef, useCallback, useImperativeHandle, useMemo, useRef, useState } from "react";
import { Size } from "assets/size/Size";
import ReactFlow, {
  Background,
  Edge,
  Connection,
  Node,
  ReactFlowInstance,
  NodeChange,
  EdgeChange,
  applyNodeChanges,
  applyEdgeChanges,
} from "react-flow-renderer";
import { GetEdgeTypes, GetNodeTypes } from "../helpers";
import { AspectObjectLibCm } from "@mimirorg/typelibrary-types";
import { BlockConnectionLine } from "../tree/edges/BlockConnectionLine";

/**
 * Coponent props
 */
interface Props {
  nodes: Node[];
  edges: Edge[];
  onNodePositionChange: (id: string, x: number, y: number) => void;
  onNodeDelete: (id: string) => void;
  onNodeDrop: (type: AspectObjectLibCm, posX: number, posY: number) => void;
  onNodeSelect: (id: string, selected: boolean) => void;
  onEdgeDelete: (id: string) => void;
  onEdgeConnect: (edge: Connection | Edge) => void;
  onEdgeSelect: (id: string, selected: boolean) => void;
}

/**
 * Component for the Flow library in BlocView.
 * @param interface
 * @returns a canvas with Flow elements and Mimir nodes, edges and transports.
 */
export const FlowBlock = forwardRef(
  (
    {
      nodes,
      edges,
      onNodePositionChange,
      onNodeDelete,
      onNodeDrop,
      onNodeSelect,
      onEdgeDelete,
      onEdgeConnect,
      onEdgeSelect,
    }: Props,
    ref
  ) => {
    /** Local state */
    const flowWrapper = useRef(null);
    const [flowInstance, setFlowInstance] = useState<ReactFlowInstance>(null);
    const [flowNodes, setNodes] = useState<Node[]>(nodes);
    const [flowEdges, setEdges] = useState<Edge[]>(edges);
    const DATA_TRANSFER_APPDATA_TYPE = "application/reactflow";

    /**
     * Hook that can be connected from parent components
     * Used to redraw stage after outside changes
     */
    useImperativeHandle(ref, () => ({
      updateNodes(value: Node[]) {
        setNodes(value);
      },
      updateEdges(value: Edge[]) {
        setEdges(value);
      },
    }));

    /**
     * React flow init function.
     * This function is setting the react flow instance
     */
    const OnInit = useCallback((_reactFlowInstance: ReactFlowInstance) => {
      return setFlowInstance(_reactFlowInstance);
    }, []);

    /**
     * When an item from another component is moving over a flow element, this function will trigger
     */
    const OnDragOver = (event: React.DragEvent<HTMLDivElement>) => {
      // console.log("OnDragOver");
      event.preventDefault();
      event.dataTransfer.dropEffect = "move";
    };

    /**
     * Fire when a react flow drag stop
     */
    const OnNodeDragStop = useCallback(
      (_event: React.DragEvent<HTMLDivElement>, _node: Node, nodes: Node[]) => {
        nodes.forEach((x) => {
          onNodePositionChange(x.id, x.position.x, x.position.y);
        });
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [flowNodes, flowEdges]
    );

    /**
     * Fire when two connectors is connected by an edge
     * @param connection
     * @returns void
     */
    const OnConnect = (connection: Connection): void => {
      if (connection == null) throw new Error("Can't connect edge. The connection object is null or undefined.");
      onEdgeConnect(connection);
    };

    /**
     * Fires when a aspect object type is dropped on the stage
     * TODO: Implement sub-project funtionality
     * const IsSubProject = (event: React.DragEvent<HTMLDivElement>) => {
     * const data = JSON.parse(event.dataTransfer.getData(DATA_TRANSFER_APPDATA_TYPE));
     *   return !Object.prototype.hasOwnProperty.call(data, "aspect");
     * };
     * @param event Drop event
     */
    const OnDrop = (event: React.DragEvent<HTMLDivElement>) => {
      event.stopPropagation();
      event.preventDefault();
      if (!event.dataTransfer.types.includes(DATA_TRANSFER_APPDATA_TYPE)) return;

      const data = JSON.parse(event.dataTransfer.getData(DATA_TRANSFER_APPDATA_TYPE)) as AspectObjectLibCm;
      const reactFlowBounds = flowWrapper.current.getBoundingClientRect();

      const position = flowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      onNodeDrop(data, position.x, position.y);
    };

    /**
     * Node change events
     */
    const OnNodesChange = useCallback(
      (changes: NodeChange[]) => {
        changes.forEach((x) => {
          if (x.type === "remove") onNodeDelete(x.id);
          if (x.type === "select") onNodeSelect(x.id, x.selected);
          setNodes((n) => applyNodeChanges(changes, n));
        });
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [flowNodes]
    );

    /**
     * Edge change events
     */
    const OnEdgesChange = useCallback(
      (changes: EdgeChange[]) => {
        changes.forEach((x) => {
          if (x.type === "remove") onEdgeDelete(x.id);
          if (x.type === "select") onEdgeSelect(x.id, x.selected);
          setEdges((e) => applyEdgeChanges(changes, e));
        });
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [flowEdges]
    );

    /**
     * Render function
     */
    return (
      <div className="reactflow-wrapper" ref={flowWrapper}>
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
          multiSelectionKeyCode={"ControlLeft"}
          connectionLineComponent={BlockConnectionLine}
          deleteKeyCode={"Delete"}
        >
          <Background />
        </ReactFlow>
      </div>
    );
  }
);

FlowBlock.displayName = "FlowTree";
export default FlowBlock;
