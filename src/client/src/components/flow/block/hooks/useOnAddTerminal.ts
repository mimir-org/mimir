import { Dispatch } from "redux";
import { TerminalLibCm, NodeLibCm } from "@mimirorg/typelibrary-types";
import ConvertTerminalLibCmToTerminal from "../../converters/ConvertTerminalLibCmToTerminal";
import { ConnectorDirection, Project } from "@mimirorg/modelbuilder-types";
import { addTerminal } from "../../../../redux/store/project/actions";
import { IsTerminal } from "../../helpers/Connectors";

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
  nodeTypes: NodeLibCm[],
  direction: ConnectorDirection,
  dispatch: Dispatch
) => {
  if (terminalTypes == null) return;

  const matchingTerminalType = terminalTypes.find((x) => x.id === typeId);
  if (matchingTerminalType == null) return;

  // Find actual node
  const node = project?.nodes?.find((x) => x.id === nodeId);
  if (node == null) return;

  // Check if it is allowed to add more terminals
  const nodeType = nodeTypes.find((x) => x.id === node.libraryTypeId);
  if (nodeType == null) return;

  const nodeTerrminalType = nodeType.nodeTerminals.find((x) => x.terminal.id === typeId);
  if (nodeTerrminalType == null) return;

  const terminalsOfTheSameType = node.connectors?.filter(
    (x) => IsTerminal(x) && x.terminalTypeId === typeId && x.type === direction && !x.isProxy
  );

  if (terminalsOfTheSameType.length >= nodeTerrminalType.maxQuantity) return;

  // Convert and create terminal
  const terminal = ConvertTerminalLibCmToTerminal(matchingTerminalType, direction, terminalTypes);
  terminal.nodeId = nodeId;

  dispatch(addTerminal(terminal));
};

export default useOnAddTerminal;
