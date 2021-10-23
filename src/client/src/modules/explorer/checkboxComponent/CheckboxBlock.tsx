import { Node, Project } from "../../../models";
import { splitNodeSelector, useAppDispatch, useAppSelector } from "../../../redux/store";
import { GetSelectedNode } from "../../../components/flow/helpers";
import { OnBlockChange } from "../handlers";
import { CheckboxWrapper } from "./styled";
import { GetCheckboxColor, IsChecked } from "../helpers";

interface Props {
  project: Project;
  node: Node;
  inputLabel: string;
}
/**
 * Checkbox used in the Explorer in BlockView
 * @param interface
 * @returns a checkbox
 */
export const CheckboxBlock = ({ project, node, inputLabel }: Props) => {
  const dispatch = useAppDispatch();
  const splitNode = useAppSelector(splitNodeSelector);
  const selectedNode = GetSelectedNode();

  return (
    <CheckboxWrapper color={GetCheckboxColor(node)}>
      <input
        type="checkbox"
        checked={IsChecked(node, selectedNode, splitNode)}
        onChange={() => OnBlockChange(node, project, selectedNode, splitNode, dispatch)}
      />
      <div className="checkmark"></div>
      <div className="label">{inputLabel}</div>
    </CheckboxWrapper>
  );
};

export default CheckboxBlock;
