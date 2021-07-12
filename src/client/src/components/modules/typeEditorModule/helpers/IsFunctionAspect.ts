import { Aspect } from "../../../../models";

const IsFunctionAspect = (aspect: Aspect) => {
  return aspect === Aspect.Function;
};

export default IsFunctionAspect;
