import { CheckboxWrapper } from "./CheckboxTreeExplorer.styled";
import { Icon } from "../../../../icon/Icon";
import { Tooltip } from "../../../../tooltip/Tooltip";
import { TextResources } from "../../../../../assets/text/TextResources";

interface Props {
  onChange: () => void;
  isChecked: boolean;
  isAspectNode?: boolean;
  color: string;
  label?: string;
  icon?: string;
}

/**
 * Checkbox used in the TreeView's Explorer in Mimir.
 * @param interface
 * @returns a checkbox.
 */
export const CheckboxTreeExplorer = ({ onChange, isChecked, isAspectNode, color, icon, label }: Props) => (
  <Tooltip content={isChecked ? TextResources.UNSELECT_OBJECT : TextResources.SELECT_OBJECT} placement={"right"} offset={[0, 15]}>
    <CheckboxWrapper color={color} isAspectNode={isAspectNode}>
      <input type="checkbox" checked={isChecked ?? false} onChange={() => onChange()} />
      {isAspectNode && <Icon size={22} src={icon} alt="" />}
      {label && <span>{label}</span>}
    </CheckboxWrapper>
  </Tooltip>
);
