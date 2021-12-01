import { LockOpen, LockClosed } from "../../../assets/icons/lock";
import { ExplorerIconLine } from "../aspectComponent/styled";
import { Node, Project } from "../../../models";
import { OnLockNode } from "../handlers";
import { Dispatch } from "redux";

interface Props {
  project: Project;
  username: string;
  node: Node;
  dispatch: Dispatch;
}

export const LockComponent = ({ node, project, username, dispatch }: Props) => (
  <ExplorerIconLine isLocked={node?.isLocked}>
    <img
      src={node?.isLocked ? LockClosed : LockOpen}
      alt="lock-icon"
      className="lock-icon"
      onClick={() => OnLockNode(node, project, username, dispatch)}
    />
  </ExplorerIconLine>
);

export default LockComponent;
