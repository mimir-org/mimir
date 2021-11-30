import { FilterElement } from ".";
import { Connector, Edge } from "../../../models";
import { OnMaterialFluidChange } from "./handlers";
import { IsFluidChecked } from "./helpers";
interface Props {
  edges: Edge[];
  items: Connector[];
  dispatch: any;
  visible: boolean;
}

/**
 * Component for Material Fluid filter.
 * @param interface
 * @returns checkboxes to toggle Material fluids that exist in Mimir.
 */
const MaterialFluidFilter = ({ edges, items, dispatch, visible }: Props) => {
  // const categoryId = items[0]?.terminalCategoryId;

  return (
    visible && (
      <>
        {/* <FilterElement
          label={TextResources.Filter_MaterialFluid}
          onChange={() => OnAllFluidsChange(edges, categoryId, AllFluidsChecked(edges), dispatch)}
          isChecked={AllFluidsChecked(edges)}
          visible={visible}
          isHeader={true}
          indent={true}
        /> */}

        {items.map((conn) => {
          return (
            <FilterElement
              key={conn.id}
              label={conn.name}
              onChange={() =>
                OnMaterialFluidChange(edges, conn.terminalTypeId, IsFluidChecked(edges, conn.terminalTypeId), dispatch)
              }
              isChecked={IsFluidChecked(edges, conn.terminalTypeId)}
              visible={visible}
            />
          );
        })}
      </>
    )
  );
};

export default MaterialFluidFilter;
