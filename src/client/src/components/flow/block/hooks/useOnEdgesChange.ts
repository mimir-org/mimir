import { applyEdgeChanges, EdgeChange, Edge as FlowEdge } from "react-flow-renderer";

/**
 * Hook that runs whenever an Edge has a change in BlockView.
 * In the Flow Library a change is defined by the following types:
 * EdgeSelectionChange | EdgeRemoveChange | EdgeAddChange | EdgeResetChange
 * @param changes
 * @param setEdges
 */
const useOnEdgesChange = (changes: EdgeChange[], setEdges: React.Dispatch<React.SetStateAction<FlowEdge[]>>) => {
  setEdges((e) => applyEdgeChanges(changes, e));
};

export default useOnEdgesChange;
