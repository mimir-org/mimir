import { VisibleOnIcon, VisibleOffIcon, VisibleSubOffIcon } from "../../../assets/icons/visible";
import { ExplorerIconLine } from "../aspectComponent/styled";
import { Node } from "../../../models";
import { useAppDispatch, useAppSelector, projectSelector } from "../../../redux/store";
import { OnTreeChange } from "../handlers";

interface Props {
  node: Node;
  isAncestorVisible: boolean;
  isVisible: boolean;
  onSetVisibleElement: (visible: boolean, nodeId: string) => void;
}

export const VisibleComponent = ({ node, isAncestorVisible, isVisible, onSetVisibleElement }: Props) => {
  const dispatch = useAppDispatch();
  const project = useAppSelector(projectSelector);

  const isHidden: boolean = node?.isHidden;

  return (
    <ExplorerIconLine isHidden={isHidden}>
      <img
        src={!isVisible ? VisibleOffIcon : !isAncestorVisible ? VisibleSubOffIcon : VisibleOnIcon}
        alt="visible-icon"
        className="visible-icon"
        onClick={() => {
          onSetVisibleElement(!isVisible, node.id);
          OnTreeChange(node, project, dispatch);
        }}
      />
    </ExplorerIconLine>
  );
};
export default VisibleComponent;
