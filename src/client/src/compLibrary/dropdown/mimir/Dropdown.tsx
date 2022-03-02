import { useEffect, useState } from "react";
import { Color } from "../../colors";
import { CollapseIcon, ExpandIcon } from "../../../assets/icons/chevron";
import { FontSize } from "../../font";
import { Symbol } from "../../symbol";
import { DropdownBox, DropdownHeader, DropdownList, DropdownListItem } from "./Dropdown.styled";

interface Props {
  label: string;
  items: DropdownItem[];
  keyProp: string;
  valueProp: string;
  onChange: (item: DropdownItem) => void;
  defaultValue?: string;
  valueImageProp?: string;
  disabled?: boolean;
  borderRadius?: number;
  borderColor?: string;
  fontSize?: string;
  height?: number;
  listTop?: number;
}

interface DropdownItem {
  name: string;
  key?: string;
}

/**
 * Component for a drop-down menu in Mimir.
 * @param interface
 * @returns a drop-down menu.
 */
const Dropdown = ({
  label,
  items,
  keyProp,
  valueProp,
  onChange,
  defaultValue,
  valueImageProp,
  disabled,
  borderRadius = 5,
  borderColor = Color.BLACK,
  fontSize = FontSize.Standard,
  height = 28,
  listTop = 33,
}: Props) => {
  const [isListOpen, setIsListOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    if (!items) {
      setSelectedItem(null);
      return;
    }
    if (defaultValue) {
      setSelectedItem(items.find((x) => x[keyProp] === defaultValue));
      return;
    }
    setSelectedItem(items[0]);
  }, [defaultValue, items, keyProp]);

  const handleChange = (value: DropdownItem) => {
    setSelectedItem(value);
    setIsListOpen(!isListOpen);
    onChange(value);
  };

  return (
    items?.length > 0 && (
      <DropdownBox
        disabled={disabled}
        tabIndex={0}
        onBlur={() => {
          setIsListOpen(false);
        }}
      >
        <label htmlFor={label} />
        <>
          <DropdownHeader
            borderRadius={borderRadius}
            borderColor={borderColor}
            fontSize={fontSize}
            height={height}
            onClick={disabled ? null : () => setIsListOpen(!isListOpen)}
          >
            {selectedItem && (
              <>
                {valueImageProp && <Symbol base64={selectedItem[valueImageProp]} text={selectedItem[valueProp]} />}
                <p>{selectedItem.name ?? selectedItem.key}</p>
                <img src={isListOpen ? ExpandIcon : CollapseIcon} alt="expand-icon" />
              </>
            )}
          </DropdownHeader>
        </>
        {isListOpen && (
          <DropdownList borderRadius={borderRadius} borderColor={borderColor} top={listTop}>
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
          </DropdownList>
        )}
      </DropdownBox>
    )
  );
};

export default Dropdown;
