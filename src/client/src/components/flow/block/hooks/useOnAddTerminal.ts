import { Dispatch } from "redux";
import { TerminalLibCm, AspectObjectLibCm } from "@mimirorg/typelibrary-types";
import { ConnectorDirection, Project } from "lib";
import { ConnectorTerminal } from "../../../../lib/classes/Connector";

/**
 * Hook that runs when a user click on add terminal.
 * @param project
 * @param typeId
 * @param nodeId
 * @param terminalTypes
 * @param nodeTypes
 * @param direction
 * @param dispatch
 */
export const useOnAddTerminal = (
  project: Project,
  typeId: string,
  nodeId: string,
  terminalTypes: TerminalLibCm[],
  nodeTypes: AspectObjectLibCm[],
  direction: ConnectorDirection,
  dispatch: Dispatch
) => {
  if (terminalTypes == null) return;

  const matchingTerminalType = terminalTypes.find((x) => x.id === typeId);
  if (matchingTerminalType == null) return;

  // Find actual node
  const node = project?.aspectObjects?.find((x) => x.id === nodeId);
  if (node == null) return;

  // Check if it is allowed to add more terminals
  const nodeType = nodeTypes.find((x) => x.id === node.libraryType);
  if (nodeType == null) return;

  const nodeTerrminalType = nodeType.aspectObjectTerminals.find((x) => x.terminal.id === typeId);
  if (nodeTerrminalType == null) return;

  const terminalsOfTheSameType = node.connectors?.filter(
    (x) => x instanceof ConnectorTerminal && x.terminalType === typeId && x.direction === direction
  );

  if (terminalsOfTheSameType.length >= nodeTerrminalType.maxQuantity) return;

  // Convert and create terminal
  const terminal = new ConnectorTerminal(matchingTerminalType, direction, node.id);
  // const terminal = ConvertTerminalLibCmToTerminal(matchingTerminalType, direction, terminalTypes);
  // terminal.nodeId = nodeId;

  // dispatch(addTerminal(terminal));
};

export default useOnAddTerminal;
