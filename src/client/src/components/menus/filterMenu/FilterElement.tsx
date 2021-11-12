import { Checkbox } from "../../../compLibrary/checkbox/common";
import { ElementBox } from "./styled";

interface Props {
  onChange: () => void;
  isChecked: boolean;
  visible: boolean;
  label: string;
}
/**
 * Component for a single element in the Visual Filter.
 * @param interface
 * @returns an element with a checkbox.
 */
const FilterElement = ({ onChange, isChecked, visible, label }: Props) => {
  return (
    visible && (
      <ElementBox>
        <Checkbox isChecked={isChecked} onChange={onChange} />
        {label}
      </ElementBox>
    )
  );
};
export default FilterElement;
