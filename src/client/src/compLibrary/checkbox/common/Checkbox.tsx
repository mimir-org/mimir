import { CheckboxWrapper } from "./styled";

interface Props {
  isChecked: boolean;
  onChange: () => void;
  readOnly?: boolean;
}
/**
 * A generic checkbox for Mimir.
 * @param interface
 * @returns a checkbox.
 */
const Checkbox = ({ isChecked, onChange, readOnly }: Props) => (
  <CheckboxWrapper>
    <label className={"checkbox-block"}>
      <input type="checkbox" readOnly={readOnly} checked={isChecked} onChange={() => onChange()} />
      <span className="checkmark-block"></span>
    </label>
  </CheckboxWrapper>
);

export default Checkbox;
