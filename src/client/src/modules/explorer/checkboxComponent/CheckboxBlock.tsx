import { AspectColorType, Node, Project } from "../../../models";
import { useAppDispatch } from "../../../redux/store";
import { GetAspectColor } from "../../../helpers";
import { OnBlockChange } from "../handlers";
import { CheckboxBlockWrapper } from "./styled";
import { IsChecked, IsMiniCheckBox } from "./helpers";
import { Elements } from "react-flow-renderer";

interface Props {
  project: Project;
  node: Node;
  inputLabel: string;
  secondaryNode: Node;
  elements: Elements<any>;
}
/**
 * Checkbox used in the Explorer in BlockView
 * @param interface
 * @returns a checkbox with different styling for parentNodes and childNodes.
 */
export const CheckboxBlock = ({ project, node, inputLabel, secondaryNode, elements }: Props) => {
  const dispatch = useAppDispatch();
  const selectedNode = project?.nodes.find((n) => n.isSelected);

  return (
    <CheckboxBlockWrapper
      color={GetAspectColor(node, AspectColorType.Selected)}
      miniCheckBox={IsMiniCheckBox(node, selectedNode, secondaryNode)}
    >
      <input
        type="checkbox"
        checked={IsChecked(elements, node)}
        onChange={() => OnBlockChange(node, selectedNode, secondaryNode, dispatch)}
      />
      <div className="label">{inputLabel}</div>
    </CheckboxBlockWrapper>
  );
};

export default CheckboxBlock;
