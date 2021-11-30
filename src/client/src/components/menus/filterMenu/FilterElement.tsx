import { Checkbox } from "../../../compLibrary/input/checkbox/common";
import { CreateId } from "../../flow/helpers";
import { ElementBox, ElementLabel } from "./styled";

interface Props {
  onChange: () => void;
  isChecked: boolean;
  visible: boolean;
  label: string;
  isHeader?: boolean;
  indent?: number;
}
/**
 * Component for a single element in the Visual Filter.
 * @param interface
 * @returns an element with a checkbox.
 */
const FilterElement = ({ onChange, isChecked, visible, label, isHeader = false, indent = 1 }: Props) =>
  visible && (
    <ElementBox isHeader={isHeader} indent={indent}>
      <Checkbox isChecked={isChecked} onChange={onChange} id={CreateId()} leftPos={indent * 20} />
      <ElementLabel isHeader={isHeader} onClick={onChange}>
        {label}
      </ElementLabel>
    </ElementBox>
  );
export default FilterElement;
