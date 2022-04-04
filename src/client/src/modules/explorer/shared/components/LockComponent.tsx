import { LockClosed, LockOpen } from "../../../../assets/icons/lock";
import { AspectButton } from "../styled/AspectButton";
import { Icon } from "../../../../compLibrary/icon";
import { Tooltip } from "../../../../compLibrary/tooltip/Tooltip";

interface Props {
  isLocked: boolean;
  onToggleLocked: () => void;
  unlockText: string;
  lockText: string;
}

export const LockComponent = ({ isLocked, onToggleLocked, unlockText, lockText }: Props) => (
  <Tooltip content={isLocked ? unlockText : lockText} offset={[0, 5]}>
    <AspectButton isLocked={isLocked} onClick={onToggleLocked}>
      <Icon size={15} src={isLocked ? LockClosed : LockOpen} alt="" />
    </AspectButton>
  </Tooltip>
);
