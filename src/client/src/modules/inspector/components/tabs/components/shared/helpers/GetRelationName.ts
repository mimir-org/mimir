import { Connector } from "@mimirorg/modelbuilder-types";
import { TextResources } from "../../../../../../../assets/text/TextResources";
import { IsLocationRelation, IsPartOfRelation, IsProductRelation } from "../../../../../../../components/flow/helpers/Connectors";

export const GetRelationName = (connector: Connector) => {
  if (IsPartOfRelation(connector)) return TextResources.PARTOF;
  if (IsLocationRelation(connector)) return TextResources.HAS_LOCATION;
  if (IsProductRelation(connector)) return TextResources.FULFILLED_BY;
  return TextResources.TRANSPORT;
};
