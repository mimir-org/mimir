import { useState, useEffect } from "react";
import { MenuWrapper, MenuHeader, MenuList, MenuListItem } from "./styled";
import {
  ExpandWhiteIcon,
  CollapseWhiteIcon,
} from "../../../../../../assets/icons/common";

interface Props {
  label: string;
  items: any[];
  keyProp: string;
  valueProp: string;
  onChange: Function;
  defaultValue?: string;
  color: string;
}

const EntityDropdown = ({
  label,
  items,
  keyProp,
  valueProp,
  onChange,
  defaultValue,
  color,
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
    <MenuWrapper>
      <label htmlFor={label} />
      <div onClick={(e) => setIsListOpen(!isListOpen)}>
        <MenuHeader>
          {selectedItem && (
            <>
              <p>{selectedItem.name ?? selectedItem.key}</p>
              <img
                src={isListOpen ? ExpandWhiteIcon : CollapseWhiteIcon}
                alt="expand-icon"
              />
            </>
          )}
        </MenuHeader>
      </div>
      {isListOpen && (
        <MenuList>
          {items?.map((item) => {
            return (
              <div onClick={(e) => handleChange(e, item)} key={item[keyProp]}>
                <MenuListItem color={color}>
                  <p>{item.name ?? item.key}</p>
                </MenuListItem>
              </div>
            );
          })}
        </MenuList>
      )}
    </MenuWrapper>
  );
};

export default EntityDropdown;
