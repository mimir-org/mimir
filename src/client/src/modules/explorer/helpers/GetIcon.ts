import { VisibleOffIcon, VisibleOnIcon, VisibleSubOffIcon } from "../../../assets/icons/visible";

const GetIcon = (isHidden: boolean, isAncestorVisible: boolean, isVisible: boolean) => {
  if (isVisible && !isHidden) return VisibleOnIcon;
  if (!isVisible && isHidden) return VisibleOffIcon;
  if (isVisible && !isAncestorVisible) return VisibleSubOffIcon;
  return VisibleOnIcon;
};

export default GetIcon;
