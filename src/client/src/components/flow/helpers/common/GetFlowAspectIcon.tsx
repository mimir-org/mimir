import {
  ProductIcon,
  FunctionIcon,
  LocationIcon,
} from "../../../../assets/icons/common";
import { Aspect } from "../../../../models";

const GetFlowAspectIcon = (aspect: Aspect) => {
  let AspectIcon =
    aspect === Aspect.Function
      ? FunctionIcon
      : aspect === Aspect.Product
      ? ProductIcon
      : aspect === Aspect.Location
      ? LocationIcon
      : null;

  return (
    <img
      src={AspectIcon}
      className="aspect-icon"
      alt={Aspect[aspect]}
      draggable={false}
    />
  );
};

export default GetFlowAspectIcon;
