import { Aspect } from "../../../../../models";
import { IsFunction, IsLocation, IsProduct } from "../../helpers";

const GetBlockHeight = (aspect: Aspect) => {
  let height = 0;
  if (IsFunction(aspect) || IsProduct(aspect)) {
    height = 70;
  } else if (IsLocation(aspect)) {
    height = 65;
  }
  return height;
};

export default GetBlockHeight;
