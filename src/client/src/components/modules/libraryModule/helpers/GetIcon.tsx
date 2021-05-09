import {
  ProductIcon,
  FunctionIcon,
  LocationIcon,
} from "../../../../assets/icons";

const GetIcon = (icon: string, size: string) => {
  switch (icon) {
    case "FunctionIcon":
      return (
        <img
          src={FunctionIcon}
          width={size + "px"}
          height={size + "px"}
          alt="func-icon"
        />
      );
    case "ProductIcon":
      return (
        <img
          src={ProductIcon}
          width={size + "px"}
          height={size + "px"}
          alt="prod-icon"
        />
      );
    case "LocationIcon":
      return (
        <img
          src={LocationIcon}
          width={size + "px"}
          height={size + "px"}
          alt="loc-icon"
        />
      );
    default:
      return null;
  }
};

export default GetIcon;
