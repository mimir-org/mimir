import { Connector } from "@mimirorg/modelbuilder-types";
import { Node } from "../../../../../models";
import { IsInputTerminal, IsOutputTerminal, IsPartOfRelation } from "../../../helpers/Connectors";

export const GetHandleLeftPosition = (node: Node, connector: Connector, isElectro: boolean, isParent: boolean) => {
  if (!IsPartOfRelation(connector)) return "revert";
  if (isElectro) return GetElectroLeftPosition(node, connector, isParent);
  return isParent ? "50%" : "46%";
};

export const GetHandleTopPosition = (node: Node, connector: Connector, isElectro: boolean, isParent: boolean) => {
  if (!IsPartOfRelation(connector)) return "0px";
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
