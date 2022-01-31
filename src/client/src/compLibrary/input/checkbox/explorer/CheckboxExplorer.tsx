import { CheckboxWrapper } from "./styled";
import { Icon } from "../../../icon";

interface Props {
  onChange: () => void;
  isChecked: boolean;
  isMiniCheckbox?: boolean | false;
  isBlockView: boolean;
  isAspectNode: boolean;
  color: string;
  label?: string;
  icon?: string;
}

/**
 * Checkbox used in the Explorer in Mimir.
 * @param interface
 * @returns a checkbox.
 */
const CheckboxExplorer = ({ onChange, isChecked, isMiniCheckbox, isBlockView, isAspectNode, color, icon, label }: Props) => (
  <CheckboxWrapper color={color} miniCheckBox={isMiniCheckbox} isBlockView={isBlockView} isAspectNode={isAspectNode}>
    <input type="checkbox" checked={isChecked ?? false} onChange={() => onChange()} />
    {isAspectNode && <Icon size={22} src={icon} alt="" />}
    {label && <span>{label}</span>}
  </CheckboxWrapper>
);

export default CheckboxExplorer;
