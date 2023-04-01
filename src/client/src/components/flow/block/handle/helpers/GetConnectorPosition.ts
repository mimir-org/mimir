import { AspectObject, ConnectorPartOf, Connector, Direction } from "lib";

/**
 * Component to get the left position of a connector in BlockView.
 * This component is called from the BlockNodeTerminal.
 * @param node
 * @param connector
 * @param isElectro
 * @param isParent
 * @returns a string representing the left position.
 */
export const GetHandleLeftPosition = (node: AspectObject, connector: Connector, isElectro: boolean, isParent: boolean) => {
  if (connector instanceof ConnectorPartOf) return "revert";
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
export const GetHandleTopPosition = (node: AspectObject, connector: Connector, isElectro: boolean, isParent: boolean) => {
  if (!(connector instanceof ConnectorPartOf)) return "0px";
  if (isElectro) return GetElectroTopPosition(isParent);

  if (connector.direction === Direction.Input) return isParent ? 100 + "px" : "0px";
  if (connector.direction === Direction.Output) return isParent ? "0px" : "115px";
};

function GetElectroLeftPosition(node: AspectObject, connector: Connector, isParent: boolean) {
  if (isParent) return connector.direction === Direction.Input ? 100 + "px" : "0px";
  return connector.direction === Direction.Input ? "0px" : "180x";
}

function GetElectroTopPosition(isParent: boolean) {
  if (isParent) return "500px";
  return "50px";
}
