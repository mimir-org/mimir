import { Relation } from "@mimirorg/modelbuilder-types";
import { CreateId } from "../../components/flow/helpers";

export const createRelationCopy = (relation: Relation): Relation => {
  if (relation == null) return null;

  const id = CreateId();
  const copy = { ...relation };
  copy.id = id;
  copy.iri = null;

  return copy;
};
