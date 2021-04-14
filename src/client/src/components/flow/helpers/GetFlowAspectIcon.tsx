import { ProductIcon, FunctionIcon, LocationIcon } from "../../../assets";

const GetFlowAspectIcon = (icon: string) => {
  switch (icon) {
    case "FunctionIcon":
      return (
        <img
          src={FunctionIcon}
          className="aspect-icon"
          alt={icon}
          draggable={false}
        />
      );
    case "ProductIcon":
      return (
        <img
          src={ProductIcon}
          className="aspect-icon"
          alt={icon}
          draggable={false}
        />
      );
    case "LocationIcon":
      return (
        <img
          src={LocationIcon}
          className="aspect-icon"
          alt={icon}
          draggable={false}
        />
      );
    default:
      return (
        <img
          src={FunctionIcon}
          className="aspect-icon"
          alt={icon}
          draggable={false}
        />
      );
  }
};

export default GetFlowAspectIcon;
