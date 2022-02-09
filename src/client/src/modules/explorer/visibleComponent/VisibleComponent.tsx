import { AspectButton } from "../aspectComponent/styled";
import { GetIcon } from "../helpers";
import { Icon } from "../../../compLibrary/icon";
import { Tooltip } from "../../../compLibrary/tooltip/Tooltip";

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

export default VisibleComponent;
