import { CheckboxWrapper } from "./dropdown/styled";
import { ElementBox } from "./styled";

interface Props {
  label: string;
  onChange: () => void;
  isChecked: boolean;
}
/**
 * Component for a single element in the Visual Filter
 * @param interface
 * @returns a checkbox
 */
const FilterElement = ({ label, onChange, isChecked }: Props) => (
  <ElementBox>
    <CheckboxWrapper>
      <label className={"checkbox-block"}>
        <input type="checkbox" checked={isChecked} onChange={() => onChange()} />
        <span className="checkmark-block"></span>
        <div className="text">{label}</div>
      </label>
    </CheckboxWrapper>
  </ElementBox>
);
export default FilterElement;
