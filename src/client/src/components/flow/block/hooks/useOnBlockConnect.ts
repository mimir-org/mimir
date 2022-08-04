import { Dispatch } from "redux";
import { addEdge, Connection, Edge as FlowEdge } from "react-flow-renderer";
import { SaveEventData } from "../../../../redux/store/localStorage/localStorage";
import { CreateId } from "../../helpers";
import { createEdge } from "../../../../redux/store/project/actions";
import { ConvertEdgeDataToMimirEdge } from "../../converters";
import { LibraryState } from "../../../../redux/store/library/types";
import { IsOffPage } from "../../../../helpers/Aspects";
import { GetBlockEdgeType } from "../helpers";
import { IsTerminal } from "../../helpers/Connectors";
import { HandleOffPageConnect } from "./handlers/HandleOffPageConnect";
import { Project } from "@mimirorg/modelbuilder-types";

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
const useOnBlockConnect = (params: Params) => {
  SaveEventData(null, "edgeEvent");
  const { project, connection, lib, animatedEdge, setEdges, dispatch } = params;
  const id = CreateId();
  const source = project.nodes.find((node) => node.id === connection.source);
  const target = project.nodes.find((node) => node.id === connection.target);

  if (IsOffPage(source) && IsOffPage(target)) {
    HandleOffPageConnect(params, source, target);
    return;
  }

  const sourceConn = source.connectors.find((c) => c.id === connection.sourceHandle);
  const targetConn = target.connectors.find((c) => c.id === connection.targetHandle);

  const edge = ConvertEdgeDataToMimirEdge(id, sourceConn, targetConn, source, target, project.id, lib);
  dispatch(createEdge(edge));

  const type = GetBlockEdgeType(sourceConn, source, target);
  const animated = animatedEdge && IsTerminal(sourceConn);

  return setEdges((els) => {
    return addEdge({ ...connection, id, type, animated, data: { source, target, edge } }, els);
  });
};

export default useOnBlockConnect;
