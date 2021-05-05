import { ProductIcon, FunctionIcon, LocationIcon } from "../../../assets";

const GetFlowAspectIcon = (icon: string) => {
  let AspectIcon =
    icon === "FunctionIcon"
      ? FunctionIcon
      : icon === "ProductIcon"
      ? ProductIcon
      : icon === "LocationIcon"
      ? LocationIcon
      : null;

  return (
    <img
      src={AspectIcon}
      className="aspect-icon"
      alt={icon}
      draggable={false}
    />
  );
};

export default GetFlowAspectIcon;
