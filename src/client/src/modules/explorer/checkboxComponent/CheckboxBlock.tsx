import { EDGE_KIND, Node, Project } from "../../../models";
import { secondaryNodeSelector, useAppDispatch, useAppSelector } from "../../../redux/store";
import { GetSelectedNode } from "../../../components/flow/helpers";
import { OnBlockChange } from "../handlers";
import { CheckboxWrapper } from "./styled";
import { GetCheckboxColor } from "../helpers";
import { EDGE_TYPE } from "../../../models/project";

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

  const isChecked = () => {
    const edgeTypes = Object.values(EDGE_TYPE);
    let checked = false;

    elements?.forEach((elem) => {
      const isEdge = edgeTypes.some((x) => x === elem.type?.toString() || elem.kind === EDGE_KIND);
      if (!isEdge) if (node.id === elem.data.id) checked = true;
    });
    return checked;
  };

  return (
    <CheckboxWrapper color={GetCheckboxColor(node)}>
      <input
        type="checkbox"
        checked={isChecked()}
        onChange={() => OnBlockChange(project, node, selectedNode, secondaryNode, dispatch)}
      />
      <div className="checkmark"></div>
      <div className="label">{inputLabel}</div>
    </CheckboxWrapper>
  );
};

export default CheckboxBlock;
