import { FilterElement } from ".";
import { TextResources } from "../../../assets/text";
import { Connector, Edge } from "../../../models";
import { OnAllFluidsChange, OnMaterialFluidChange } from "./handlers";
import { AllFluidsChecked, IsFluidChecked } from "./helpers";
import { SubHeader } from "./styled";

interface Props {
  edges: Edge[];
  fluidItems: Connector[];
  dispatch: any;
}

/**
 * Component for Material Fluid filter.
 * @param interface
 * @returns checkboxes to toggle Material fluids that exist in Mimir.
 */
const MaterialFluidFilter = ({ edges, fluidItems, dispatch }: Props) => {
  const FLUID_TERMINAL_CATEGORY_ID = "7AF97A80D52C7CE139AE278A712C6A37";
  const MULTIPHASE_CATEGORY_ID = "ADAB65FA78CDC483F3D3BD5C6747FB0F";
  const OIL_CATEGORY_ID = "25ECDC57F0659C1242B70339A2239A5A";
  const HOT_WATER_CATEGORY_ID = "3BAA052FEFE1B4639950C2506361297B";

  return (
    <>
      <SubHeader>{TextResources.Filter_MaterialFluid}</SubHeader>
      <FilterElement
        label={TextResources.Filter_Show_All}
        onChange={() => OnAllFluidsChange(edges, FLUID_TERMINAL_CATEGORY_ID, AllFluidsChecked(edges), dispatch)}
        isChecked={AllFluidsChecked(edges)}
        visible={!!fluidItems.length}
      />
      <FilterElement
        label={TextResources.Filter_Show_Oil}
        onChange={() => OnMaterialFluidChange(edges, OIL_CATEGORY_ID, IsFluidChecked(edges, OIL_CATEGORY_ID), dispatch)}
        isChecked={IsFluidChecked(edges, OIL_CATEGORY_ID)}
        visible={true}
      />
      <FilterElement
        label={TextResources.Filter_Show_HotWater}
        onChange={() =>
          OnMaterialFluidChange(edges, HOT_WATER_CATEGORY_ID, IsFluidChecked(edges, HOT_WATER_CATEGORY_ID), dispatch)
        }
        isChecked={IsFluidChecked(edges, HOT_WATER_CATEGORY_ID)}
        visible={true}
      />
      <FilterElement
        label={TextResources.Filter_Show_Multiphase}
        onChange={() =>
          OnMaterialFluidChange(edges, MULTIPHASE_CATEGORY_ID, IsFluidChecked(edges, MULTIPHASE_CATEGORY_ID), dispatch)
        }
        isChecked={IsFluidChecked(edges, MULTIPHASE_CATEGORY_ID)}
        visible={true}
      />
    </>
  );
};

export default MaterialFluidFilter;
