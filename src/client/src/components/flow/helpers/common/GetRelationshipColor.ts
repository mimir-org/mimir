import { TextResources } from "../../../../assets/textResources";
import { Node, Connector } from "../../../../models/project";
import {
  IsFulfilledByTerminal,
  IsFunctionNode,
  IsLocationNode,
  IsLocationTerminal,
  IsPartOfTerminal,
  IsProductNode,
} from ".";

const GetRelationshipColor = (
  conn: Connector,
  node: Node
): [name: string, color: string] => {
  let color = "";
  let name = "";

  if (IsPartOfTerminal(conn)) {
    name = TextResources.Relations_PartOf;
  }

  if (IsLocationTerminal(conn)) {
    name = TextResources.Relations_HasLocation;
  }

  if (IsFulfilledByTerminal(conn)) {
    name = TextResources.Relations_FulfilledBy;
  }

  if (IsFunctionNode(node)) {
    color = "#FEF445";
  }

  if (IsLocationNode(node)) {
    color = "#FA00FF";
  }

  if (IsProductNode(node)) {
    color = "#00F0FF";
  }

  return [name, color];
};

export default GetRelationshipColor;
