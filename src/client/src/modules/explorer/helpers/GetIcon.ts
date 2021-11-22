import { VisibleOnIcon, VisibleOffIcon, VisibleSubOffIcon } from "../../../assets/icons/visible";

const GetIcon = (isAncestorVisible: boolean, isVisible: boolean) => {
  return !isVisible ? VisibleOffIcon : !isAncestorVisible ? VisibleSubOffIcon : VisibleOnIcon;
};

export default GetIcon;
