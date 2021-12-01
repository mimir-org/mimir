import { CheckboxWrapper } from "./styled";
import { Color } from "../../../colors";

interface Props {
  isChecked: boolean;
  onChange: () => void;
  color?: string;
  readOnly?: boolean | false;
  id?: string;
  marginLeft?: number;
}

/**
 * A generic checkbox for Mimir.
 * @param interface
 * @returns a checkbox.
 */
const Checkbox = ({ isChecked, onChange, color = Color.GreyHeader, readOnly, id, marginLeft = 0 }: Props) => (
  <CheckboxWrapper color={color} marginLeft={marginLeft}>
    <input type="checkbox" readOnly={readOnly} key={id} checked={isChecked} onChange={() => onChange()} />
    <div className="checkmark"></div>
  </CheckboxWrapper>
);

export default Checkbox;
