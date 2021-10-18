import { Edge } from "../../../../models";
import { setEdgeVisibility } from "../../../../redux/store/project/actions";

const OnChange = (edge: Edge, dispatch: any) => {
  if (edge) dispatch(setEdgeVisibility(edge, !edge.isHidden));
};

export default OnChange;
