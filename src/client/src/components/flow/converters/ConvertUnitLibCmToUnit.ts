import { UnitLibCm } from "@mimirorg/typelibrary-types";
import { UnitLibCm as Unit } from "@mimirorg/modelbuilder-types";

const ConvertUnitLibCmToUnit = (unitLibCms: UnitLibCm[]) => {
  return unitLibCms.map((u) => {
    return {
      id: u.id,
      description: u.description,
      iri: u.iri,
      kind: u.kind,
      name: u.name,
      symbol: u.symbol,
      typeReferences: u.typeReferences,
    } as Unit;
  });
};

export default ConvertUnitLibCmToUnit;
