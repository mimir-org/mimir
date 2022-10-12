import { Dispatch } from "redux";
import { addEdge, Connection, Edge as FlowEdge } from "react-flow-renderer";
import { SaveEventData } from "../../../../redux/store/localStorage/localStorage";
import { CreateId } from "../../helpers";
import { addTerminal, createEdge } from "../../../../redux/store/project/actions";
import { IsOffPage } from "../../../../helpers/Aspects";
import { GetBlockEdgeType, IsTerminalSiblings } from "../helpers";
import { IsTerminal } from "../../helpers/Connectors";
import { HandleOffPageConnect } from "./handlers/HandleOffPageConnect";
import { Connector, ConnectorDirection, ConnectorVisibility, Project, Terminal } from "@mimirorg/modelbuilder-types";
import { LibraryState } from "../../../../redux/store/library/types";
import { ConvertEdgeDataToMimirEdge } from "../../converters";

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

  if (IsOffPage(source) && IsOffPage(target)) {
    HandleOffPageConnect(params, source, target);
    return;
  }

  const sourceConn = source.connectors.find((c) => c.id === connection.sourceHandle);
  const targetConn = target.connectors.find((c) => c.id === connection.targetHandle);

  // Create Mimir edge
  const edge = ConvertEdgeDataToMimirEdge(id, sourceConn, targetConn, source, target, project.id, library);
  dispatch(createEdge(edge));

  // Create Mimir proxy terminals
  const isSiblings = IsTerminalSiblings(source, target);
  console.log('Søsken: ', isSiblings)

  if (isSiblings) {
    // TODO: We need a proxy parent terminal id
    // TODO: If bidirectional terminal
    const proxySourceIn = { ...sourceConn, isProxy: true, attributes: null, type: ConnectorDirection.Input, id: CreateId(), connectorVisibility: ConnectorVisibility.InputVisible } as Terminal;
    // const proxyTargetIn = { ...targetConn, isProxy: true, attributes: null, type: ConnectorDirection.Input, id: CreateId(), connectorVisibility: ConnectorVisibility.InputVisible } as Terminal;
    // const proxySourceOut = { ...sourceConn, isProxy: true, attributes: null, type: ConnectorDirection.Output, id: CreateId(), connectorVisibility: ConnectorVisibility.OutputVisible } as Terminal;
    const proxyTargetOut = { ...targetConn, isProxy: true, attributes: null, type: ConnectorDirection.Output, id: CreateId(), connectorVisibility: ConnectorVisibility.OutputVisible } as Terminal;
    dispatch(addTerminal(proxySourceIn));
    // dispatch(addTerminal(proxyTargetIn));
    // dispatch(addTerminal(proxySourceOut));
    dispatch(addTerminal(proxyTargetOut));
  }

  // We need to check if there is a fullfilled connection
  const proxyTerminals = [] as Connector[];
  for (let i = 0; i < project.nodes.length; i++) {
    for (let j = 0; i < project.nodes[i].connectors.length; i++) {
      const terminal = project.nodes[i].connectors[j];
      if (IsTerminal(terminal) && terminal.isProxy)
        proxyTerminals.push(terminal);
    }
  }

  console.log(proxyTerminals);

  const type = GetBlockEdgeType(sourceConn, source, target);
  const animated = animatedEdge && IsTerminal(sourceConn);

  return setEdges((els) => {
    return addEdge({ ...connection, id, type, animated, data: { source, target, edge } }, els);
  });
};

export default useOnBlockConnect;
