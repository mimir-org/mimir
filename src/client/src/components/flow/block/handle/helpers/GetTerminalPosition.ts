import { Node, Connector } from "@mimirorg/modelbuilder-types";
import { IsInputConnector, IsOutputConnector, IsPartOfRelation } from "../../../helpers/Connectors";

/**
 * Component to get the left position of a connector in BlockView.
 * This component is called from the BlockNodeTerminal.
 * @param node
 * @param connector
 * @param isElectro
 * @param isParent
 * @returns a string representing the left position.
 */
export const GetHandleLeftPosition = (node: Node, connector: Connector, isElectro: boolean, isParent: boolean) => {
  if (!IsPartOfRelation(connector)) return "revert";
  if (isElectro) return GetElectroLeftPosition(node, connector, isParent);
  return isParent ? "50%" : "46%";
};

/**
 * Component to get the top position of a connector in BlockView.
 * This component is called from the BlockNodeTerminal.
 * @param node
 * @param connector
 * @param isElectro
 * @param isParent
 * @returns
 */
export const GetHandleTopPosition = (node: Node, connector: Connector, isElectro: boolean, isParent: boolean) => {
  if (!IsPartOfRelation(connector)) return "0px";
  if (isElectro) return GetElectroTopPosition(isParent);

  if (IsInputConnector(connector)) return isParent ? node.height + "px" : "0px";
  if (IsOutputConnector(connector)) return isParent ? "0px" : "115px";
};

function GetElectroLeftPosition(node: Node, connector: Connector, isParent: boolean) {
  if (isParent) return IsInputConnector(connector) ? node.width + "px" : "0px";
  return IsInputConnector(connector) ? "0px" : "180x";
}

function GetElectroTopPosition(isParent: boolean) {
  if (isParent) return "500px";
  return "50px";
}
