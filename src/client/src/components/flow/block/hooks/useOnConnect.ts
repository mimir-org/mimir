import { Dispatch } from "redux";
import { addEdge, Connection, Edge as FlowEdge } from "react-flow-renderer";
import { SaveEventData } from "../../../../redux/store/localStorage/localStorage";
import { CreateId } from "../../helpers";
import { createEdge } from "../../../../redux/store/project/actions";
import { Project } from "../../../../models";
import { ConvertDataToEdge } from "../../converters";
import { LibraryState } from "../../../../redux/store/library/types";
import { IsOffPage } from "../../../../helpers/Aspects";
import { GetBlockEdgeType, HandleOffPageConnect } from "../helpers";
import { IsTransport } from "../../helpers/Connectors";

export interface Params {
  connection: FlowEdge | Connection;
  project: Project;
  setEdges: React.Dispatch<React.SetStateAction<FlowEdge[]>>;
  dispatch: Dispatch;
  lib: LibraryState;
  animatedEdge: boolean;
}

/**
 * Hook that runs when two nodes connect via an Edge in BlockView.
 * @param params
 * @returns an Edge connection.
 */
const useOnConnect = (params: Params) => {
  SaveEventData(null, "edgeEvent");
  const { project, connection, lib, animatedEdge, setEdges, dispatch } = params;

  const id = CreateId();
  const source = project.nodes.find((node) => node.id === connection.source);
  const sourceConn = source.connectors.find((c) => c.id === connection.sourceHandle);
  const target = project.nodes.find((node) => node.id === connection.target);
  const targetConn = target.connectors.find((c) => c.id === connection.targetHandle);

  if (IsOffPage(source) && IsOffPage(target)) {
    HandleOffPageConnect(params, source, target);
    return;
  }

  const edge = ConvertDataToEdge(id, sourceConn, targetConn, source, target, project.id, lib);
  dispatch(createEdge(edge));

  const type = GetBlockEdgeType(sourceConn, source, target);
  const animated = animatedEdge && IsTransport(sourceConn);

  return setEdges((els) => {
    return addEdge({ ...connection, id, type, animated, data: { source, target, edge: edge } }, els);
  });
};

export default useOnConnect;
