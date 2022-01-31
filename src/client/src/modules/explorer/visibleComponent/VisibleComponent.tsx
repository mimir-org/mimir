import { AspectButton } from "../aspectComponent/styled";
import { GetIcon } from "../helpers";
import { Icon } from "../../../compLibrary/icon";
import { VisuallyHidden } from "../../../compLibrary/util";
import { TextResources } from "../../../assets/text";

interface Props {
  isHidden: boolean;
  isVisible: boolean;
  isAncestorVisible: boolean;
  onToggleVisible: () => void;
}

export const VisibleComponent = ({ isHidden, isAncestorVisible, isVisible, onToggleVisible }: Props) => (
  <AspectButton isHidden={isHidden} isVisible={isVisible} onClick={onToggleVisible}>
    <VisuallyHidden>{isHidden ? TextResources.Explorer_Show_Node : TextResources.Explorer_Hide_Node}</VisuallyHidden>
    <Icon size={15} src={GetIcon(isHidden, isAncestorVisible, isVisible)} alt="" />
  </AspectButton>
);

export default VisibleComponent;
