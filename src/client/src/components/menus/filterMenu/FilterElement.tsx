import { Checkbox } from "../../../compLibrary/input/checkbox/common";
import { CreateId } from "../../flow/helpers";
import { ElementBox, ElementLabel } from "./styled";

interface Props {
  onChange: () => void;
  isChecked: boolean;
  visible: boolean;
  label: string;
  isHeader?: boolean;
  isSubHeader?: boolean;
  indent?: number;
}
/**
 * Component for a single element in the Visual Filter.
 * @param interface
 * @returns an element with a checkbox.
 */
const FilterElement = ({ onChange, isChecked, visible, label, isHeader, isSubHeader, indent = 1 }: Props) =>
  visible && (
    <ElementBox isHeader={isHeader} isSubHeader={isSubHeader} indent={indent}>
      <Checkbox isChecked={isChecked} onChange={onChange} id={CreateId()} marginLeft={indent * 8} />
      <ElementLabel isHeader={isHeader} isSubHeader={isSubHeader} onClick={onChange}>
        {label}
      </ElementLabel>
    </ElementBox>
  );
export default FilterElement;
