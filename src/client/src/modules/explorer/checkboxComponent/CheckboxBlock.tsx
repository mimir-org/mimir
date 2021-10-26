import { Node, Project } from "../../../models";
import { secondaryNodeSelector, useAppDispatch, useAppSelector } from "../../../redux/store";
import { GetSelectedNode } from "../../../components/flow/helpers";
import { OnBlockChange } from "../handlers";
import { CheckboxWrapper } from "./styled";
import { GetCheckboxColor } from "../helpers";

interface Props {
  elements: any[];
  project: Project;
  node: Node;
  inputLabel: string;
}
/**
 * Checkbox used in the Explorer in BlockView
 * @param interface
 * @returns a checkbox
 */
export const CheckboxBlock = ({ elements, project, node, inputLabel }: Props) => {
  const dispatch = useAppDispatch();
  const secondaryNode = useAppSelector(secondaryNodeSelector);
  const selectedNode = GetSelectedNode();

  return (
    <CheckboxWrapper color={GetCheckboxColor(node)}>
      <input
        type="checkbox"
        checked={!node?.isHidden ?? false}
        onChange={() => OnBlockChange(project, elements, node, selectedNode, secondaryNode, dispatch)}
      />
      <div className="checkmark"></div>
      <div className="label">{inputLabel}</div>
    </CheckboxWrapper>
  );
};

export default CheckboxBlock;
