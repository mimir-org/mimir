import { LockOpen, LockClosed } from "../../../assets/icons/lock";
import { ExplorerIconLine } from "../aspectComponent/styled";
import { Node } from "../../../models";
import { OnLockNode } from "../handlers";

interface Props {
  node: Node;
}

export const LockComponent = ({ node }: Props) => {
  const isLocked: boolean = node?.isLocked;
  return (
    <ExplorerIconLine isLocked={isLocked}>
      <img src={isLocked ? LockClosed : LockOpen} alt="lock-icon" className="lock-icon" onClick={OnLockNode(node)} />
    </ExplorerIconLine>
  );
};
export default LockComponent;
