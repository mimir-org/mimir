import { LockOpen, LockClosed } from "../../../assets/icons/lock";
import { ExplorerIconLine } from "../aspectComponent/styled";
import { Node } from "../../../models";
import { OnLockNode } from "../handlers";

interface Props {
  node: Node;
}

export const LockComponent = ({ node }: Props) => (
  <ExplorerIconLine isLocked={node?.isLocked}>
    <img src={node?.isLocked ? LockClosed : LockOpen} alt="lock-icon" className="lock-icon" onClick={OnLockNode(node)} />
  </ExplorerIconLine>
);

export default LockComponent;