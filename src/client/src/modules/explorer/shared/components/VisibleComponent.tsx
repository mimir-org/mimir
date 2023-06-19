import { AspectButton } from "../styled/AspectButton";
import { Tooltip } from "../../../../compLibrary/tooltip/Tooltip";
import { VisibleOffIcon, VisibleOnIcon } from "../../../../assets/icons/visible";
import { Icon } from "@mimirorg/component-library";

interface Props {
  isHidden: boolean;
  onToggleVisible: () => void;
  showText: string;
  hideText: string;
}

export const VisibleComponent = ({ isHidden, onToggleVisible, showText, hideText }: Props) => (
  <Tooltip content={isHidden ? showText : hideText} offset={[0, 5]}>
    <AspectButton isHidden={isHidden} isVisible={!isHidden} onClick={onToggleVisible}>
      <Icon size={15} src={GetIcon(isHidden)} alt="" />
    </AspectButton>
  </Tooltip>
);

function GetIcon(isHidden: boolean) {
  if (isHidden) return VisibleOffIcon;
  return VisibleOnIcon;
}
