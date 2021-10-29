import { Edge } from "../../../../models";
import { setEdgeAnimation } from "../../../../redux/store/project/actions";
import { IsTransport } from "../../../flow/helpers";

const OnAnimationChange = (edges: Edge[], dispatch: any) => {
  edges?.forEach((edge) => {
    if (IsTransport(edge.fromConnector)) dispatch(setEdgeAnimation(edge, !edge.animated));
  });
};

export default OnAnimationChange;
