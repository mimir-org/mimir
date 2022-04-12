import { AspectButton } from "../styled/AspectButton";
import { Icon } from "../../../../compLibrary/icon";
import { Tooltip } from "../../../../compLibrary/tooltip/Tooltip";
import { VisibleOffIcon, VisibleOnIcon, VisibleSubOffIcon } from "../../../../assets/icons/visible";

interface Props {
  hidden: boolean;
  isVisible: boolean;
  isAncestorVisible: boolean;
  onToggleVisible: () => void;
  showText: string;
  hideText: string;
}

export const VisibleComponent = ({ hidden, isAncestorVisible, isVisible, onToggleVisible, showText, hideText }: Props) => (
  <Tooltip content={hidden ? showText : hideText} offset={[0, 5]}>
    <AspectButton hidden={hidden} isVisible={isVisible} onClick={onToggleVisible}>
      <Icon size={15} src={GetIcon(hidden, isAncestorVisible, isVisible)} alt="" />
    </AspectButton>
  </Tooltip>
);

function GetIcon(hidden: boolean, isAncestorVisible: boolean, isVisible: boolean) {
  if (isVisible && !hidden) return VisibleOnIcon;
  if (!isVisible && hidden) return VisibleOffIcon;
  if (isVisible && !isAncestorVisible) return VisibleSubOffIcon;
  return VisibleOnIcon;
}
