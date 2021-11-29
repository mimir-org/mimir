import { Edge } from "../../../../models";
import { IsTransport } from "../../../flow/helpers";

const IsFluidChecked = (edges: Edge[], fluidId: string) => {
  const FLUID_TERMINAL_CATEGORY_ID = "7AF97A80D52C7CE139AE278A712C6A37";

  return !edges.some(
    (x) =>
      x.isHidden &&
      x.fromConnector.terminalCategoryId === FLUID_TERMINAL_CATEGORY_ID &&
      x.fromConnector.terminalTypeId === fluidId &&
      IsTransport(x.fromConnector)
  );
};

export default IsFluidChecked;
