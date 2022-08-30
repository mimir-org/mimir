import { UnitLibCm } from "@mimirorg/typelibrary-types";
import { Unit } from "@mimirorg/modelbuilder-types";
import { CreateId } from "../helpers";
import { TextResources } from "../../../assets/text/TextResources";

const ConvertUnitLibCmToUnit = (unitLibCms: UnitLibCm[]) => {
  return unitLibCms.map((u) => {
    return {
      id: CreateId(),
      unitTypeId: u.id,
      unitTypeIri: u.iri,
      name: u.name,
      description: u.description,
      symbol: u.symbol,
      kind: TextResources.KIND_UNIT,
    } as Unit;
  });
};

export default ConvertUnitLibCmToUnit;
