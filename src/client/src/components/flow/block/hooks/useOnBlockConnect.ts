import { Dispatch } from "redux";
import { addEdge, Connection, Edge as FlowEdge } from "react-flow-renderer";
import { SaveEventData } from "../../../../redux/store/localStorage/localStorage";
import { CreateId } from "../../helpers";
import { createEdge } from "../../../../redux/store/project/actions";
import { GetBlockEdgeType } from "../helpers";
import { IsTerminal } from "../../helpers/Connectors";
import { Project } from "@mimirorg/modelbuilder-types";
import { LibraryState } from "../../../../redux/store/library/types";
import { ConvertEdgeDataToMimirEdge } from "../../converters";
import { CreateSiblingProxyConnection } from "./helpers/ProxyTerminals";
import { setValidation } from "../../../../redux/store/validation/validationSlice";
import { TextResources } from "../../../../assets/text/TextResources";

export interface OnBlockDropParameters {
  connection: FlowEdge | Connection;
  project: Project;
  library: LibraryState;
  setEdges: React.Dispatch<React.SetStateAction<FlowEdge[]>>;
  dispatch: Dispatch;
  animatedEdge: boolean;
}

/**
 * Hook that runs when two nodes connect via an Edge in BlockView.
 * @param params
 * @returns an Edge connection.
 */
const useOnBlockConnect = (params: OnBlockDropParameters) => {
  SaveEventData(null, "edgeEvent");
  const { project, library, connection, animatedEdge, setEdges, dispatch } = params;
  const id = CreateId();
  const source = project.nodes.find((node) => node.id === connection.source);
  const target = project.nodes.find((node) => node.id === connection.target);

  const sourceConn = source.connectors.find((c) => c.id === connection.sourceHandle);
  const targetConn = target.connectors.find((c) => c.id === connection.targetHandle);

  // Stop if connection is not valid
  // Connectors must be of the same type
  if (IsTerminal(sourceConn) && IsTerminal(targetConn) && sourceConn.terminalTypeId !== targetConn.terminalTypeId) return;

  // There is already something connected
  const existingEdge = project.edges.find(
    (edge) =>
      (edge.fromConnectorId === sourceConn?.id && IsTerminal(edge.fromConnector)) ||
      (edge.toConnectorId === sourceConn?.id && IsTerminal(edge.toConnector)) ||
      (edge.fromConnectorId === targetConn?.id && IsTerminal(edge.fromConnector)) ||
      (edge.toConnectorId === targetConn?.id && IsTerminal(edge.toConnector))
  );

  if (existingEdge != null) return;

  // Create Mimir edge
  const edge = ConvertEdgeDataToMimirEdge(id, sourceConn, targetConn, source, target, project.id, project.iri, library);

  // If there is noe matching transport or interface, it is not allowed to create the edge
  if (edge.transport === null && edge.interface === null) {
    dispatch(setValidation({ valid: false, message: TextResources.VALIDATION_TRANSPORT_INTERFACE }));
    return;
  }

  dispatch(createEdge(edge));

  // Create Mimir connection
  CreateSiblingProxyConnection(sourceConn, targetConn, source, target, dispatch);

  // Identify full connection
  // ResolveSubStreams(project, dispatch, null, edge);

  const type = GetBlockEdgeType(sourceConn);
  const animated = animatedEdge && IsTerminal(sourceConn);

  return setEdges((els) => {
    return addEdge({ ...connection, id, type, animated, data: { source, target, edge } }, els);
  });
};

export default useOnBlockConnect;
