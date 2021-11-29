import { Edge } from "../../../../models";
import { setEdgeVisibility } from "../../../../redux/store/project/actions";
import { IsTransport } from "../../../flow/helpers";

const OnAllFluidsChange = (edges: Edge[], categoryId: string, isChecked: boolean, dispatch: any) => {
  edges?.forEach((edge) => {
    if (IsTransport(edge.fromConnector)) {
      if (edge.fromConnector.terminalCategoryId === categoryId) dispatch(setEdgeVisibility(edge, isChecked));
    }
  });
};

export default OnAllFluidsChange;
