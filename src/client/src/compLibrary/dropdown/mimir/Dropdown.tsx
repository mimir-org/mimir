import { useState, useEffect } from "react";
import { FontSize } from "../..";
import { ExpandIcon, CollapseIcon } from "../../../assets/icons/common";
import { Symbol } from "../../symbol";
import {
  DropdownMenuWrapper,
  DropdownMenuHeader,
  DropdownMenuList,
  DropdownMenuListItem,
} from "./styled";

interface Props {
  label: string;
  items: any[];
  keyProp: string;
  valueProp: string;
  onChange: Function;
  defaultValue?: string;
  valueImageProp?: string;
  disabled?: boolean;
  borderRadius?: number;
  fontSize?: string;
  height?: number;
}

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
  fontSize = FontSize.Standard,
  height = 28,
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

  const handleChange = (_e: any, value: any) => {
    setSelectedItem(value);
    setIsListOpen(!isListOpen);
    onChange(value);
  };

  return (
    <>
      <DropdownMenuWrapper disabled={disabled}>
        <label htmlFor={label} />
        <div onClick={disabled ? null : (e) => setIsListOpen(!isListOpen)}>
          <DropdownMenuHeader
            borderRadius={borderRadius}
            fontSize={fontSize}
            height={height}
          >
            {selectedItem && (
              <>
                {valueImageProp && (
                  <Symbol
                    base64={selectedItem[valueImageProp]}
                    text={selectedItem[valueProp]}
                  />
                )}
                <p>{selectedItem.name ?? selectedItem.key}</p>
                <img
                  src={isListOpen ? ExpandIcon : CollapseIcon}
                  alt="expand-icon"
                />
              </>
            )}
          </DropdownMenuHeader>
        </div>
        {isListOpen && (
          <DropdownMenuList borderRadius={borderRadius} fontSize={fontSize}>
            {items?.map((item) => {
              return (
                <div onClick={(e) => handleChange(e, item)} key={item[keyProp]}>
                  <DropdownMenuListItem fontSize={fontSize} height={height}>
                    {valueImageProp && (
                      <Symbol
                        base64={item[valueImageProp]}
                        text={item[valueProp]}
                      />
                    )}
                    <p>{item.name ?? item.key}</p>
                  </DropdownMenuListItem>
                </div>
              );
            })}
          </DropdownMenuList>
        )}
      </DropdownMenuWrapper>
    </>
  );
};

export default Dropdown;
