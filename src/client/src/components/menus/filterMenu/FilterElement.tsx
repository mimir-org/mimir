import { Checkbox } from "../../../compLibrary/checkbox/common";
import { CreateId } from "../../flow/helpers";
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
const FilterElement = ({ onChange, isChecked, visible, label }: Props) =>
  visible && (
    <ElementBox>
      <Checkbox isChecked={isChecked} onChange={() => onChange()} id={CreateId()} />
      <div className="text">{label}</div>
    </ElementBox>
  );

export default FilterElement;
