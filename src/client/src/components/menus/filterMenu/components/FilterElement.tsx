import { Checkbox } from "../../../../compLibrary/input/checkbox/common/Checkbox";
import { ElementBox, ElementLabel } from "./FilterElement.styled";
import { createId } from "@mimirorg/component-library";

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
export const FilterElement = ({ onChange, isChecked, visible, label, isHeader, isSubHeader, indent = 1 }: Props) =>
  visible && (
    <ElementBox isHeader={isHeader} isSubHeader={isSubHeader} indent={indent}>
      <Checkbox isChecked={isChecked} onChange={() => onChange()} id={createId()} marginLeft={indent * 8} />
      <ElementLabel isHeader={isHeader} isSubHeader={isSubHeader}>
        {label}
      </ElementLabel>
    </ElementBox>
  );
