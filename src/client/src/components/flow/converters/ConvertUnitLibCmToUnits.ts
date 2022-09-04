import { UnitLibCm } from "@mimirorg/typelibrary-types";
import { Unit } from "@mimirorg/modelbuilder-types";
import { CreateId } from "../helpers";
import { TextResources } from "../../../assets/text/TextResources";
import { ConvertTypeReference } from "./ConvertTypeReference";

/**
 * Component to convert units from the type UnitLibCm to Unit.
 * @param unitLibCms
 * @returns a list of units.
 */
const ConvertUnitLibCmToUnits = (unitLibCms: UnitLibCm[]) => {
  return unitLibCms.map((u) => {
    return {
      id: CreateId(),
      unitTypeId: u.id,
      unitTypeIri: u.iri,
      name: u.name,
      description: u.description,
      symbol: u.symbol,
      kind: TextResources.KIND_UNIT,
      typeReferences: ConvertTypeReference(u.typeReferences),
    } as Unit;
  });
};

export default ConvertUnitLibCmToUnits;
