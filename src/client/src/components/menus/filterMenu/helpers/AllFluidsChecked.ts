import { Edge } from "../../../../models";
import { IsTransport } from "../../../flow/helpers";

const AllFluidsChecked = (edges: Edge[]) => {
  const FLUID_TERMINAL_CATEGORY_ID = "7AF97A80D52C7CE139AE278A712C6A37";

  return !edges.some(
    (x) => x.isHidden && x.fromConnector.terminalCategoryId === FLUID_TERMINAL_CATEGORY_ID && IsTransport(x.fromConnector)
  );
};

export default AllFluidsChecked;
