import { LockClosed, LockOpen } from "../../../assets/icons/lock";
import { AspectButton } from "../aspectComponent/styled";
import { Icon } from "../../../compLibrary/icon";
import { VisuallyHidden } from "../../../compLibrary/util";
import { TextResources } from "../../../assets/text";

interface Props {
  isLocked: boolean;
  onToggleLocked: () => void;
}

export const LockComponent = ({ isLocked, onToggleLocked }: Props) => (
  <AspectButton isLocked={isLocked} onClick={onToggleLocked}>
    <VisuallyHidden>{isLocked ? TextResources.Explorer_Unlock_Node : TextResources.Explorer_Lock_Node}</VisuallyHidden>
    <Icon size={15} src={isLocked ? LockClosed : LockOpen} alt="" />
  </AspectButton>
);

export default LockComponent;
