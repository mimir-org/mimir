import { Edge } from "../../../../models";
import { setEdgeVisibility } from "../../../../redux/store/project/actions";
import { IsTransport } from "../../../flow/helpers";

const OnMaterialFluidChange = (edges: Edge[], fluidCategodyId: string, isChecked: boolean, dispatch: any) => {
  const FLUID_TERMINAL_CATEGORY_ID = "7AF97A80D52C7CE139AE278A712C6A37";

  edges?.forEach((edge) => {
    if (IsTransport(edge.fromConnector)) {
      if (
        edge.fromConnector.terminalCategoryId === FLUID_TERMINAL_CATEGORY_ID &&
        edge.fromConnector.terminalTypeId === fluidCategodyId
      )
        dispatch(setEdgeVisibility(edge, isChecked));
    }
  });
};

export default OnMaterialFluidChange;
