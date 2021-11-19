import { CheckboxWrapper } from "./styled";

interface Props {
  label: string;
  onChange: () => void;
  isChecked: boolean;
  isMiniCheckbox?: boolean | false;
  color: string;
}
/**
 * Checkbox used in the Explorer in Mimir.
 * @param interface
 * @returns a checkbox.
 */
const CheckboxExplorer = ({ label, onChange, isChecked, isMiniCheckbox, color }: Props) => (
  <CheckboxWrapper color={color} miniCheckBox={isMiniCheckbox}>
    <input type="checkbox" checked={isChecked} onChange={() => onChange()} />
    <div className="label">{label}</div>
  </CheckboxWrapper>
);

export default CheckboxExplorer;
