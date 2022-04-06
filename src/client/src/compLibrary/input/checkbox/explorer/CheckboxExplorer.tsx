import { CheckboxWrapper } from "./CheckboxExplorer.styled";
import { Icon } from "../../../icon";
import { Tooltip } from "../../../tooltip/Tooltip";
import { TextResources } from "../../../../assets/text/TextResources";

interface Props {
  onChange: () => void;
  isChecked: boolean;
  isMiniCheckbox?: boolean;
  isBlockView?: boolean;
  isAspectNode?: boolean;
  color: string;
  label?: string;
  icon?: string;
}

/**
 * Checkbox used in the Explorer in Mimir.
 * @param interface
 * @returns a checkbox.
 */
export const CheckboxExplorer = ({
  onChange,
  isChecked,
  isMiniCheckbox,
  isBlockView,
  isAspectNode,
  color,
  icon,
  label,
}: Props) => (
  <Tooltip content={isChecked ? TextResources.UNSELECT_OBJECT : TextResources.SELECT_OBJECT} placement={"right"} offset={[0, 15]}>
    <CheckboxWrapper color={color} miniCheckBox={isMiniCheckbox} isBlockView={isBlockView} isAspectNode={isAspectNode}>
      <input type="checkbox" checked={isChecked ?? false} onChange={() => onChange()} />
      {isAspectNode && <Icon size={22} src={icon} alt="" />}
      {label && <span>{label}</span>}
    </CheckboxWrapper>
  </Tooltip>
);
