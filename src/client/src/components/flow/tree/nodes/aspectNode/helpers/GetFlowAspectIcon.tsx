import * as Icons from "../../../../../../assets/icons/aspects";
import { Aspect } from "@mimirorg/modelbuilder-types";

export const GetFlowAspectIcon = (aspect: Aspect) => {
  let AspectIcon: string;
  if (aspect === Aspect.Function) AspectIcon = Icons.Function;
  if (aspect === Aspect.Product) AspectIcon = Icons.Product;
  if (aspect === Aspect.Location) AspectIcon = Icons.Location;

  return <img src={AspectIcon} className="aspect-icon" alt={Aspect[aspect]} draggable={false} />;
};
