import { TextResources } from "../../../../assets/textResources";
import { Node, Connector } from "../../../../models/project";
import {
  IsFulfilledByTerminal,
  IsFunction,
  IsLocation,
  IsLocationTerminal,
  IsPartOfTerminal,
  IsProduct,
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

  if (IsFunction(node)) {
    color = "#FEF445";
  }

  if (IsLocation(node)) {
    color = "#FA00FF";
  }

  if (IsProduct(node)) {
    color = "#00F0FF";
  }

  return [name, color];
};

export default GetRelationshipColor;
