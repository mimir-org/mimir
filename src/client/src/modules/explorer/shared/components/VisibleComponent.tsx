import { AspectButton } from "../styled/AspectButton";
import { Icon } from "../../../../compLibrary/icon/Icon";
import { Tooltip } from "../../../../compLibrary/tooltip/Tooltip";
import { VisibleOffIcon, VisibleOnIcon, VisibleSubOffIcon } from "../../../../assets/icons/visible";

interface Props {
  isHidden: boolean;
  isVisible: boolean;
  isAncestorVisible: boolean;
  onToggleVisible: () => void;
  showText: string;
  hideText: string;
}

export const VisibleComponent = ({ isHidden, isAncestorVisible, isVisible, onToggleVisible, showText, hideText }: Props) => (
  <Tooltip content={isHidden ? showText : hideText} offset={[0, 5]}>
    <AspectButton isHidden={isHidden} isVisible={isVisible} onClick={onToggleVisible}>
      <Icon size={15} src={GetIcon(isHidden, isAncestorVisible, isVisible)} alt="" />
    </AspectButton>
  </Tooltip>
);

function GetIcon(isHidden: boolean, isAncestorVisible: boolean, isVisible: boolean) {
  if (isVisible && !isHidden) return VisibleOnIcon;
  if (!isVisible && isHidden) return VisibleOffIcon;
  if (isVisible && !isAncestorVisible) return VisibleSubOffIcon;
  return VisibleOnIcon;
}
