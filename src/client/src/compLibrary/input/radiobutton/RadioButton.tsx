import { RadioButtonWrapper } from "./RadioButton.styled";

interface Props {
  isChecked: boolean;
  onChange: (e) => void;
  id: string;
}

/**
 * Component for a radio button in Mimir.
 * @param interface
 * @returns a radio button.
 */
export const RadioButton = ({ isChecked, onChange, id }: Props) => (
  <RadioButtonWrapper>
    <input type="radio" value={id} key={id} checked={isChecked ?? false} id={id} onChange={(e) => onChange(e)} />
    <div className="checkmark-circle" />
  </RadioButtonWrapper>
);
