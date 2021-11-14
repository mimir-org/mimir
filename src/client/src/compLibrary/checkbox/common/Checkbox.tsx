import { CheckboxWrapper } from "./styled";
import { Color } from "../../";

interface Props {
  isChecked: boolean;
  onChange: () => void;
  color?: string;
  readOnly?: boolean;
  id?: string;
}
/**
 * A generic checkbox for Mimir.
 * @param interface
 * @returns a checkbox.
 */
const Checkbox = ({ isChecked, onChange, color, readOnly, id }: Props) => (
  <CheckboxWrapper color={color ?? Color.BlueMagenta}>
    <input type="checkbox" readOnly={readOnly} key={id} checked={isChecked} onChange={() => onChange()} />
    <div className="checkmark"></div>
  </CheckboxWrapper>
);

export default Checkbox;
