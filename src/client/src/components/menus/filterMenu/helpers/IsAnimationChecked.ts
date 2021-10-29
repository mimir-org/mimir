import { Edge } from "../../../../models";
import { IsTransport } from "../../../flow/helpers";

const IsAnimationChecked = (edges: Edge[]) => {
  let checked = false;

  edges.forEach((e) => {
    if (IsTransport(e.fromConnector) && e.animated) checked = true;
  });

  return checked;
};

export default IsAnimationChecked;
