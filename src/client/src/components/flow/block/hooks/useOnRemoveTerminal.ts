import { Dispatch } from "redux";
import { ConnectorTerminal, Project } from "lib";

/**
 * Hook that runs when a user click on remove terminal.
 * @param project
 * @param terminalId
 * @param nodeId
 * @param dispatch
 */
export const useOnRemoveTerminal = (project: Project, terminalId: string, nodeId: string, dispatch: Dispatch) => {
  if (terminalId == null || nodeId == null || project == null) return;

  const node = project?.aspectObjects?.find((x) => x.id === nodeId);
  if (node == null) return;

  const terminal = node.connectors?.find(
    (x) => x.id === terminalId && x instanceof ConnectorTerminal && x.hidden
  ) as ConnectorTerminal;
  if (terminal == null) return;

  // If this is the last terminal of this type, it should not delete the terminal
  const terminalsOfTheSameType = node.connectors?.filter(
    (x) => x instanceof ConnectorTerminal && x.terminalType === terminal.terminalType && x.terminalType === terminal.terminalType
  );

  if (terminalsOfTheSameType == null || terminalsOfTheSameType.length <= 1) return;

  // If there is connected edges to this connector, it should not delete the connector
  const connectedEdges = project?.connections?.filter((x) => x.fromConnector === terminalId || x.toConnector === terminalId);
  if (connectedEdges && connectedEdges.length > 0) return;

  // dispatch(deleteTerminal(terminal));
};

export default useOnRemoveTerminal;
