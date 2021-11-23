import { CheckboxWrapper } from "./styled";

interface Props {
  label: string;
  onChange: () => void;
  isChecked: boolean;
  isMiniCheckbox?: boolean | false;
  isBlockView: boolean;
  isAspectNode: boolean;
  color: string;
}
/**
 * Checkbox used in the Explorer in Mimir.
 * @param interface
 * @returns a checkbox.
 */
const CheckboxExplorer = ({ label, onChange, isChecked, isMiniCheckbox, isBlockView, isAspectNode, color }: Props) => (
  <CheckboxWrapper color={color} miniCheckBox={isMiniCheckbox} isBlockView={isBlockView} isAspectNode={isAspectNode}>
    <input type="checkbox" checked={isChecked ?? false} onChange={() => onChange()} />
    <div className="label">{label}</div>
  </CheckboxWrapper>
);

export default CheckboxExplorer;
