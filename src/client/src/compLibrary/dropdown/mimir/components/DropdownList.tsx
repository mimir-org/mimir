import { DropdownListBox, DropdownListItem } from "../Dropdown.styled";
import { Symbol } from "../../../symbol";
import { DropdownItem } from "../Dropdown";

interface Props {
  items: DropdownItem[];
  borderRadius: number;
  borderColor: string;
  height: number;
  listTop: number;
  fontSize: string;
  valueProp: string;
  valueImageProp?: string;
  keyProp: string;
  handleChange: (value: DropdownItem) => void;
}

/**
 * The expanded menu in the Dropdown component.
 * @param interface
 * @returns a menu with clickable elements.
 */
export const DropdownList = ({
  items,
  borderRadius,
  borderColor,
  height,
  listTop,
  fontSize,
  valueProp,
  valueImageProp,
  keyProp,
  handleChange,
}: Props) => (
  <DropdownListBox borderRadius={borderRadius} borderColor={borderColor} top={listTop}>
    {items?.map((item) => {
      return (
        <DropdownListItem
          fontSize={fontSize}
          height={height}
          borderRadius={borderRadius}
          onClick={() => handleChange(item)}
          key={item[keyProp]}
        >
          {valueImageProp && <Symbol base64={item[valueImageProp]} text={item[valueProp]} />}
          <p>{item.name ?? item.key}</p>
        </DropdownListItem>
      );
    })}
  </DropdownListBox>
);
