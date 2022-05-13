import { Connector, Node } from "../../../../../models";
import { IsInputTerminal, IsOutputTerminal, IsPartOfTerminal } from "../../../helpers/Connectors";

export const GetLeftPosition = (node: Node, connector: Connector, isElectro: boolean, isParent: boolean) => {
  if (!IsPartOfTerminal(connector)) return "revert";
  if (isElectro) return GetElectroLeftPosition(node, connector, isParent);
  return isParent ? "50%" : "46%";
};

export const GetTopPosition = (node: Node, connector: Connector, isElectro: boolean, isParent: boolean) => {
  if (!IsPartOfTerminal(connector)) return "0px";
  if (isElectro) return GetElectroTopPosition(isParent);

  if (IsInputTerminal(connector)) return isParent ? node.height + "px" : "0px";
  if (IsOutputTerminal(connector)) return isParent ? "0px" : "115px";
};

export const GetElectroLeftPosition = (node: Node, connector: Connector, isParent: boolean) => {
  if (isParent) return IsInputTerminal(connector) ? node.width + "px" : "0px";
  return IsInputTerminal(connector) ? "0px" : "180x";
};

export const GetElectroTopPosition = (isParent: boolean) => {
  if (isParent) return "500px";
  return "50px";
};
