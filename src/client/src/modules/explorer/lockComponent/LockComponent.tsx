import { LockOpen, LockClosed } from "../../../assets/icons/lock";
import { ExplorerIconLine } from "../aspectComponent/styled";
import { Node, Project } from "../../../models";
import { OnLockNode } from "../handlers";

interface Props {
  node: Node;
  project: Project;
}

export const LockComponent = ({ node, project }: Props) => {
  const isLocked: boolean = node?.isLocked;
  return (
    <ExplorerIconLine isLocked={isLocked}>
      <img
        src={isLocked ? LockClosed : LockOpen}
        alt="lock-icon"
        className="lock-icon"
        onClick={OnLockNode(node, project, !isLocked)}
      />
    </ExplorerIconLine>
  );
};
export default LockComponent;
