import { Checkbox } from "../../../compLibrary/input/checkbox/common";
import { CreateId } from "../../flow/helpers";
import { ElementBox, ElementLabel } from "./styled";

interface Props {
  onChange: () => void;
  isChecked: boolean;
  visible: boolean;
  label: string;
  isHeader?: boolean;
}
/**
 * Component for a single element in the Visual Filter.
 * @param interface
 * @returns an element with a checkbox.
 */
const FilterElement = ({ onChange, isChecked, visible, label, isHeader = false }: Props) =>
  visible && (
    <ElementBox isHeader={isHeader}>
      <Checkbox isChecked={isChecked} onChange={onChange} id={CreateId()} leftPos={20} />
      <ElementLabel isHeader={isHeader} onClick={onChange}>
        {label}
      </ElementLabel>
    </ElementBox>
  );
export default FilterElement;
