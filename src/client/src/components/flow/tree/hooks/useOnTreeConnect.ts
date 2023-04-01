import { addEdge, Connection as FlowConnection, Edge as FlowEdge } from "react-flow-renderer";
import { SaveEventData } from "../../../../redux/store/localStorage/localStorage";
import { Project } from "lib";

interface OnTreeDropParameters {
  connection: FlowEdge | FlowConnection;
  project: Project;
  setEdges: React.Dispatch<React.SetStateAction<FlowEdge[]>>;
}

/**
 * Hook that runs when two nodes connect via an Edge in TreeView.
 * @param params
 * @returns an Edge connection.
 */
const useOnTreeConnect = (params: OnTreeDropParameters) => {
  SaveEventData(null, "edgeEvent");
  const { project, connection, setEdges } = params;

  const edge = project.convertFromFlowEdge(connection, null);
  if (edge == null) return;

  const [source, target] = project.getConnectorNodes(connection.source, connection.target);
  const type = edge.getComponentType("Tree");

  return setEdges((els) => {
    return addEdge({ ...connection, id: edge.id, type: type, animated: false, data: { source, target, edge } }, els);
  });
};

export default useOnTreeConnect;
