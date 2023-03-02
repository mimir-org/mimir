import { Checkbox } from "../../../compLibrary/input/checkbox/common/Checkbox";
import { VisualFilterDataCategory } from "../../../lib/models/application/VisualFilter";
import { ElementBox, ElementLabel } from "./components/FilterElement.styled";
import { VisualFilterDataItemComponent } from "./VisualFilterDataItemComponent";

interface Props {
  category: VisualFilterDataCategory;
  onChange: (category: string, item: string | null) => void;
  indent?: number;
}
/**
 * Component for a single element in the Visual Filter.
 * @param interface
 * @returns an element with a checkbox.
 */
export const VisualFilterDataCategoryComponent = ({ category, onChange, indent = 1 }: Props) =>
  category && (
    <>
      <ElementBox isHeader={true} isSubHeader={false} indent={indent}>
        <Checkbox isChecked={category.checked} onChange={() => onChange(category.id, null)} marginLeft={indent * 8} />
        <ElementLabel isHeader={true} isSubHeader={false}>
          {category.name}
        </ElementLabel>
      </ElementBox>
      {category.items &&
        category.items.map((item, index) => {
          return <VisualFilterDataItemComponent key={index} item={item} onChange={() => onChange(category.id, item.id)} />;
        })}
    </>
  );
