import { SaveEventData } from "../../../redux/store/localStorage/localStorage";
import { CreateId, IsTransport } from "../helpers";
import { addEdge, Connection, Elements, Edge as FlowEdge } from "react-flow-renderer";
import { createEdge } from "../../../redux/store/project/actions";
import { Project } from "../../../models";
import { ConvertToEdge } from "../converters";
import { LibraryState } from "../../../redux/store/library/types";
import { IsOffPage } from "../../../helpers";
import { Dispatch } from "redux";
import { GetBlockEdgeType } from "../block/helpers";
import { HandleOffPageConnect } from "./helpers/HandleOffPageConnect";

export interface Params {
  connection: FlowEdge | Connection;
  project: Project;
  setElements: React.Dispatch<React.SetStateAction<Elements>>;
  dispatch: Dispatch;
  library: LibraryState;
  animatedEdge: boolean;
}

/**
 * Hook that runs when two nodes connect via an Edge in BlockView.
 * @param params
 * @returns an Edge connection.
 */
const useOnConnectBlock = (params: Params) => {
  SaveEventData(null, "edgeEvent");
  const { project, connection, library, animatedEdge, setElements, dispatch } = params;
  const id = CreateId();
  const sourceNode = project.nodes.find((node) => node.id === connection.source);
  const sourceConn = sourceNode.connectors.find((c) => c.id === connection.sourceHandle);
  const targetNode = project.nodes.find((node) => node.id === connection.target);
  const targetConn = targetNode.connectors.find((c) => c.id === connection.targetHandle);

  if (IsOffPage(sourceNode) && IsOffPage(targetNode)) {
    HandleOffPageConnect(params, sourceNode, targetNode);
    return;
  }

  const currentEdge = ConvertToEdge(id, sourceConn, targetConn, sourceNode, targetNode, project.id, library);
  dispatch(createEdge(currentEdge));

  return setElements((els) => {
    return addEdge(
      {
        ...connection,
        id: id,
        type: GetBlockEdgeType(sourceConn, sourceNode, targetNode),
        animated: animatedEdge && IsTransport(sourceConn),
        data: {
          source: sourceNode,
          target: targetNode,
          edge: currentEdge,
        },
      },
      els
    );
  });
};

export default useOnConnectBlock;
