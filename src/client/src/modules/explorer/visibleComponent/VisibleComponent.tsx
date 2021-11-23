import { ExplorerIconLine } from "../aspectComponent/styled";
import { Node } from "../../../models";
import { useAppDispatch, useAppSelector, projectSelector } from "../../../redux/store";
import { OnTreeChange } from "../handlers";
import { GetIcon } from "../helpers";

interface Props {
  node: Node;
  isAncestorVisible: boolean;
  isVisible: boolean;
  onSetVisibleElement: (visible: boolean, nodeId: string) => void;
}

export const VisibleComponent = ({ node, isAncestorVisible, isVisible, onSetVisibleElement }: Props) => {
  const dispatch = useAppDispatch();
  const project = useAppSelector(projectSelector);
  const isHidden = node?.isHidden;

  return (
    <ExplorerIconLine isHidden={isHidden} isVisible={isVisible}>
      <img
        src={GetIcon(isHidden, isAncestorVisible, isVisible)}
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
