import { TextResources } from "../../../../assets/text";
import { TERMINAL_CATEGORY_ID } from "../../../../models";

const GetCategoryName = (category: string) => {
  if (category === TERMINAL_CATEGORY_ID.MATERIAL_FLUID) return TextResources.Filter_Category_MaterialFluid;
  if (category === TERMINAL_CATEGORY_ID.MATERIAL_GRANULATE) return TextResources.Filter_Category_MaterialGranulate;
  if (category === TERMINAL_CATEGORY_ID.ENERGY_ELECTRICAL) return TextResources.Filter_Category_EnergyElectrical;
  if (category === TERMINAL_CATEGORY_ID.ENERGY_MECHANICAL) return TextResources.Filter_Category_EnergyMechanical;
  if (category === TERMINAL_CATEGORY_ID.ENERGY_THERMAL) return TextResources.Filter_Category_EnergyThermal;
  if (category === TERMINAL_CATEGORY_ID.FORCE) return TextResources.Filter_Category_Force;
  if (category === TERMINAL_CATEGORY_ID.INFORMATION) return TextResources.Filter_Category_Information;
};

export default GetCategoryName;
