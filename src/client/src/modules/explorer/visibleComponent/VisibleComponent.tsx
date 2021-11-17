import { VisibleOnIcon, VisibleOffIcon } from "../../../assets/icons/visible";
import { ExplorerIconLine } from "../aspectComponent/styled";
import { Node } from "../../../models";
import { ChangeNodeDisplay } from "../helpers";

interface Props {
  node: Node;
}

export const VisibleComponent = ({ node }: Props) => {
  const isHidden: boolean = node?.isHidden;
  return (
    <ExplorerIconLine isHidden={isHidden}>
      <img
        src={isHidden ? VisibleOffIcon : VisibleOnIcon}
        alt="visible-icon"
        className="visible-icon"
        onClick={ChangeNodeDisplay(node)}
      />
    </ExplorerIconLine>
  );
};
export default VisibleComponent;
