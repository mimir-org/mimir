import { VisibleOnIcon, VisibleOffIcon } from "../../../assets/icons/visible";
import { ExplorerIconLine } from "../aspectComponent/styled";
import { Node, Project } from "../../../models";
import { ChangeNodeDisplay } from "../helpers";

interface Props {
  node: Node;
  project: Project;
}

export const VisibleComponent = ({ node, project }: Props) => {
  const isHidden: boolean = node?.isHidden;
  return (
    <ExplorerIconLine isHidden={isHidden}>
      <img
        src={isHidden ? VisibleOffIcon : VisibleOnIcon}
        alt="visible-icon"
        className="visible-icon"
        onClick={ChangeNodeDisplay(node, project)}
      />
    </ExplorerIconLine>
  );
};
export default VisibleComponent;
