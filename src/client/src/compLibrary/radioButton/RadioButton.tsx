import { RadioButtonWrapper } from "./styled";

interface Props {
  isChecked: boolean;
  onChange: () => void;
  id: string;
}

/**
 * Component for a radio button in Mimir.
 * @param interface
 * @returns a radio button.
 */
const RadioButton = ({ isChecked, onChange, id }: Props) => {
  return (
    <RadioButtonWrapper>
      <input type="radio" checked={isChecked} id={id} onChange={onChange} />
      <div className="checkmark-circle"></div>
    </RadioButtonWrapper>
  );
};

export default RadioButton;
