import { Aspect } from "../../../../models";

const IsLocationAspect = (aspect: Aspect) => {
  return aspect === Aspect.Location;
};

export default IsLocationAspect;
