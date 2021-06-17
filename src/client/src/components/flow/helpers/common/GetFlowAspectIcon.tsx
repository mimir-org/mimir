import {
  ProductIcon,
  FunctionIcon,
  LocationIcon,
} from "../../../../assets/icons/common";

const GetFlowAspectIcon = (aspect: string) => {
  let AspectIcon =
    aspect === "Function"
      ? FunctionIcon
      : aspect === "Product"
      ? ProductIcon
      : aspect === "Location"
      ? LocationIcon
      : null;

  return (
    <img
      src={AspectIcon}
      className="aspect-icon"
      alt={aspect}
      draggable={false}
    />
  );
};

export default GetFlowAspectIcon;
