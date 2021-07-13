import { Aspect } from "../../../../models";
import {
  ProductIcon,
  FunctionIcon,
  LocationIcon,
} from "../../../../assets/icons/common";

const GetFlowAspectIcon = (aspect: Aspect) => {
  let AspectIcon: string;
  if (aspect === Aspect.Function) AspectIcon = FunctionIcon;
  if (aspect === Aspect.Product) AspectIcon = ProductIcon;
  if (aspect === Aspect.Location) AspectIcon = LocationIcon;

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
