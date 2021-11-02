import { Edge } from "../../../../models";
import { setEdgeVisibility } from "../../../../redux/store/project/actions";
import { IsTransport } from "../../../flow/helpers";

const OnAllTransportsChange = (edges: Edge[], dispatch: any) => {
  const hidden = edges.some((x) => x.isHidden);

  edges?.forEach((edge) => {
    if (IsTransport(edge.fromConnector)) {
      dispatch(setEdgeVisibility(edge, !hidden));
    }
  });
};

export default OnAllTransportsChange;
