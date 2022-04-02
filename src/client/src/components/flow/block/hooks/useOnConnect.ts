import { Dispatch } from "redux";
import { addEdge, Connection, Edge as FlowEdge } from "react-flow-renderer";
import { SaveEventData } from "../../../../redux/store/localStorage/localStorage";
import { CreateId } from "../../helpers";
import { createEdge } from "../../../../redux/store/project/actions";
import { Project } from "../../../../models";
import { ConvertToEdge } from "../../converters";
import { LibraryState } from "../../../../redux/store/library/types";
import { IsOffPage } from "../../../../helpers/Aspects";
import { GetBlockEdgeType, HandleOffPageConnect } from "../helpers";
import { IsTransport } from "../../helpers/Connectors";

export interface Params {
  connection: FlowEdge | Connection;
  project: Project;
  setEdges: React.Dispatch<React.SetStateAction<FlowEdge[]>>;
  dispatch: Dispatch;
  library: LibraryState;
  animatedEdge: boolean;
}

/**
 * Hook that runs when two nodes connect via an Edge in BlockView.
 * @param params
 * @returns an Edge connection.
 */
const useOnConnect = (params: Params) => {
  SaveEventData(null, "edgeEvent");
  const { project, connection, library, animatedEdge, setEdges, dispatch } = params;

  const id = CreateId();
  const sourceNode = project.nodes.find((node) => node.id === connection.source);
  const sourceConn = sourceNode.connectors.find((c) => c.id === connection.sourceHandle);
  const targetNode = project.nodes.find((node) => node.id === connection.target);
  const targetConn = targetNode.connectors.find((c) => c.id === connection.targetHandle);

  if (IsOffPage(sourceNode) && IsOffPage(targetNode)) {
    HandleOffPageConnect(params, sourceNode?.id, targetNode?.id);
    return;
  }

  const edge = ConvertToEdge(id, sourceConn, targetConn, sourceNode, targetNode, project.id, library);
  dispatch(createEdge(edge));

  return setEdges((els) => {
    return addEdge(
      {
        ...connection,
        id: id,
        type: GetBlockEdgeType(sourceConn, sourceNode, targetNode),
        animated: animatedEdge && IsTransport(sourceConn),
        data: {
          source: sourceNode,
          target: targetNode,
          edge: edge,
        },
      },
      els
    );
  });
};

export default useOnConnect;
