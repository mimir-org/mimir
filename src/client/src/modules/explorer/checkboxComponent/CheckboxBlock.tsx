import { Node, Project } from "../../../models";
import { splitNodeSelector, splitViewSelector, useAppDispatch, useAppSelector } from "../../../redux/store";
import { GetSelectedNode } from "../../../components/flow/helpers";
import { OnCheckboxChange } from "../handlers";

interface Props {
  node: Node;
  inputLabel: string;
  project: Project;
}
/**
 * Checkbox used in the Explorer in BlockView
 * @param interface
 * @returns a checkbox
 */
export const CheckboxBlock = ({ node, inputLabel, project }: Props) => {
  const dispatch = useAppDispatch();
  const nodes = project?.nodes;
  const splitView = useAppSelector(splitViewSelector);
  const splitViewNode = useAppSelector(splitNodeSelector);
  const selectedNode = GetSelectedNode();
  const isSplitViewNode = splitViewNode?.id === node.id;
  const isChecked = splitView ? node === selectedNode || isSplitViewNode : node === selectedNode;

  return (
    <label className={"checkbox"}>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={() => OnCheckboxChange(dispatch, splitView, node, selectedNode, splitViewNode, nodes)}
      />
      <span className="checkmark"></span>
      <label className="checkbox_label">{inputLabel}</label>
    </label>
  );
};

export default CheckboxBlock;
