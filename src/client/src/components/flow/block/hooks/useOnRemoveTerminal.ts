import { Dispatch } from "redux";
import { Project, Terminal, ConnectorVisibility } from "@mimirorg/modelbuilder-types";
import { deleteTerminal } from "../../../../redux/store/project/actions";
import { IsTerminal } from "../../../../services";

/**
 * Hook that runs when a user click on remove terminal.
 * @param project
 * @param terminalId
 * @param nodeId
 * @param dispatch
 */
export const useOnRemoveTerminal = (project: Project, terminalId: string, nodeId: string, dispatch: Dispatch) => {
  if (terminalId == null || nodeId == null || project == null) return;

  const node = project?.nodes?.find((x) => x.id === nodeId);
  if (node == null) return;

  const terminal = node.connectors?.find(
    (x) => x.id === terminalId && IsTerminal(x) && !x.isProxy && x.connectorVisibility === ConnectorVisibility.None
  ) as Terminal;
  if (terminal == null) return;

  // If this is the last terminal of this type, it should not delete the terminal
  const terminalsOfTheSameType = node.connectors?.filter(
    (x) => IsTerminal(x) && x.terminalTypeId === terminal.terminalTypeId && x.type === terminal.type && !x.isProxy
  );

  if (terminalsOfTheSameType == null || terminalsOfTheSameType.length <= 1) return;

  // If there is connected edges to this connector, it should not delete the connector
  const connectedEdges = project?.edges?.filter((x) => x.fromConnectorId === terminalId || x.toConnectorId === terminalId);
  if (connectedEdges && connectedEdges.length > 0) return;

  dispatch(deleteTerminal(terminal));
};

export default useOnRemoveTerminal;
