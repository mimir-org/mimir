import { UnitLibCm } from "@mimirorg/typelibrary-types";
import { Unit } from "@mimirorg/modelbuilder-types";
import { CreateId } from "../helpers";
import { TextResources } from "../../../assets/text/TextResources";

/**
 * Component to convert units from the type UnitLibCm to Unit.
 * @param unitLibCms
 * @returns a list of units.
 */
const ConvertUnitLibCmToUnits = (unitLibCms: UnitLibCm[]) => {
  return unitLibCms.map((u) => {
    const unit: Unit = {
      id: CreateId(),
      iri: null,
      unitTypeId: u.id,
      unitTypeIri: u.iri,
      name: u.name,
      symbol: u.symbol,
      kind: TextResources.KIND_UNIT,
    };
    return unit;
  });
};

export default ConvertUnitLibCmToUnits;
