import { Checkbox } from "../../../compLibrary/input/checkbox/common";
import { CreateId } from "../../flow/helpers";
import { ElementBox, ElementLabel } from "./styled";

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
const FilterElement = ({ onChange, isChecked, visible, label }: Props) =>
  visible && (
    <ElementBox>
      <Checkbox isChecked={isChecked} onChange={onChange} id={CreateId()} />
      <ElementLabel onClick={onChange}>{label}</ElementLabel>
    </ElementBox>
  );
export default FilterElement;
