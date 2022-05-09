import { LockClosed, LockOpen } from "../../../../../assets/icons/lock";
import { AspectButton } from "../styled/AspectButton";
import { ExplorerLockSpinner } from "../styled/ExplorerLockSpinner";
import { Icon } from "../../../../../compLibrary/icon";
import { Tooltip } from "../../../../../compLibrary/tooltip/Tooltip";
import { Spinner } from "../../../../../compLibrary/animated";

interface Props {
  isLocked: boolean;
  nodeIsLocking: boolean;
  onToggleLocked: () => void;
  unlockText: string;
  lockText: string;
  disabled: boolean;
}

export const LockComponent = ({ isLocked, nodeIsLocking, onToggleLocked, unlockText, lockText, disabled }: Props) => (
  <Tooltip content={isLocked ? unlockText : lockText} offset={[0, 5]}>
    <AspectButton isLocked={isLocked} onClick={onToggleLocked} disabled={disabled}>
      {nodeIsLocking ? (
        <ExplorerLockSpinner>
          <Spinner variant="small" />
        </ExplorerLockSpinner>
      ) : (
        <Icon size={15} src={isLocked ? LockClosed : LockOpen} alt="" />
      )}
    </AspectButton>
  </Tooltip>
);
