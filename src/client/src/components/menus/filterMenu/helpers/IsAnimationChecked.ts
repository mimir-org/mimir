import { Edge } from "../../../../models";
import { IsTransport } from "../../../flow/helpers";

const IsAnimationChecked = (edges: Edge[]) => {
  return edges.some((e) => IsTransport(e.fromConnector) && e.animated);
};

export default IsAnimationChecked;
