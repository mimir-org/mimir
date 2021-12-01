import { CheckboxWrapper } from "./styled";
import { Color } from "../../../colors";

interface Props {
  isChecked: boolean;
  onChange: () => void;
  color?: string;
  readOnly?: boolean | false;
  id?: string;
}

/**
 * A generic checkbox for Mimir.
 * @param interface
 * @returns a checkbox.
 */
const Checkbox = ({ isChecked, onChange, color = Color.GreyHeader, readOnly, id }: Props) => (
  <CheckboxWrapper color={color}>
    <input type="checkbox" readOnly={readOnly} key={id} checked={isChecked} onChange={() => onChange()} />
    <div className="checkmark"></div>
  </CheckboxWrapper>
);

export default Checkbox;
