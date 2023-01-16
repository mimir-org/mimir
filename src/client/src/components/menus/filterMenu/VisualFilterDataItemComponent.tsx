import { Checkbox } from "../../../compLibrary/input/checkbox/common/Checkbox";
import { VisualFilterDataItem } from "../../../models/application/VisualFilter";
import { ElementBox, ElementLabel } from "./components/FilterElement.styled";

interface Props {
  item: VisualFilterDataItem;
  onChange: () => void;
  indent?: number;
}
/**
 * Component for a single element in the Visual Filter.
 * @param interface
 * @returns an element with a checkbox.
 */
export const VisualFilterDataItemComponent = ({ item, onChange, indent = 2 }: Props) =>
  item && (
    <ElementBox isHeader={false} isSubHeader={true} indent={indent}>
      <Checkbox isChecked={item.checked} onChange={onChange} marginLeft={indent * 8} />
      <ElementLabel isHeader={false} isSubHeader={true}>
        {item.name}
      </ElementLabel>
    </ElementBox>
  );
