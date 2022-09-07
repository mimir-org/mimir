import { useEffect, useState } from "react";
import { Color } from "../../../assets/color/Color";
import { FontSize } from "../../../assets/font";
import { DropdownBox } from "./Dropdown.styled";
import { DropdownHeader } from "./components/DropdownHeader";
import { DropdownList } from "./components/DropdownList";

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
  isParameterDropdown?: boolean;
}

export interface DropdownItem {
  name: string;
  key?: string;
}

/**
 * Component for a drop-down menu in Mimir.
 * @param interface
 * @returns a drop-down menu.
 */
export const Dropdown = ({
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
  fontSize = FontSize.STANDARD,
  height = 28,
  listTop = 33,
  isParameterDropdown,
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

  return items?.length ? (
    <DropdownBox
      disabled={disabled}
      tabIndex={0}
      isParameterDropdown={isParameterDropdown}
      onBlur={() => {
        setIsListOpen(false);
      }}
    >
      <label htmlFor={label} />
      <DropdownHeader
        borderRadius={borderRadius}
        borderColor={borderColor}
        fontSize={fontSize}
        height={height}
        disabled={disabled}
        isListOpen={isListOpen}
        setIsListOpen={setIsListOpen}
        selectedItem={selectedItem}
        valueProp={valueProp}
        valueImageProp={valueImageProp}
      />
      {isListOpen && (
        <DropdownList
          items={items}
          borderColor={borderColor}
          borderRadius={borderRadius}
          height={height}
          listTop={listTop}
          fontSize={fontSize}
          valueProp={valueProp}
          valueImageProp={valueImageProp}
          keyProp={keyProp}
          handleChange={(item: DropdownItem) => handleChange(item)}
        />
      )}
    </DropdownBox>
  ) : null;
};
