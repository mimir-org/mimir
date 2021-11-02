import { Edge } from "../../../../models";
import { setEdgeAnimation } from "../../../../redux/store/project/actions";
import { IsTransport } from "../../../flow/helpers";

const OnAnimationChange = (edges: Edge[], dispatch: any, animated: boolean) => {
  edges?.forEach((edge) => {
    if (IsTransport(edge.fromConnector)) dispatch(setEdgeAnimation(edge, !animated));
  });
};

export default OnAnimationChange;
