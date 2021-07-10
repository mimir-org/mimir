import { useState, useEffect } from "react";
import { ExpandedIcon, CollapsedIcon } from "../../assets/icons/common";
import {
  DropdownMenuWrapper,
  DropdownMenuHeader,
  DropdownMenuList,
  DropdownMenuListItem,
  Symbol,
} from ".";
interface Props {
  label: string;
  items: any[];
  keyProp: string;
  valueProp: string;
  onChange: Function;
  defaultValue?: string;
  valueImageProp?: string;
}

const Dropdown = ({
  label,
  items,
  keyProp,
  valueProp,
  onChange,
  defaultValue,
  valueImageProp,
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
      <DropdownMenuWrapper>
        <label htmlFor={label} />
        <div className="label"> {label}</div>
        <div onClick={(e) => setIsListOpen(!isListOpen)}>
          <DropdownMenuHeader>
            {selectedItem && (
              <>
                {valueImageProp && (
                  <Symbol
                    base64={selectedItem[valueImageProp]}
                    text={selectedItem[valueProp]}
                  />
                )}
                <p>{selectedItem.name}</p>
                <img
                  src={isListOpen ? ExpandedIcon : CollapsedIcon}
                  alt="expand-icon"
                />
              </>
            )}
          </DropdownMenuHeader>
        </div>
        {isListOpen && (
          <DropdownMenuList>
            {items?.map((item) => {
              return (
                <div onClick={(e) => handleChange(e, item)} key={item[keyProp]}>
                  <DropdownMenuListItem>
                    {valueImageProp && (
                      <Symbol
                        base64={item[valueImageProp]}
                        text={item[valueProp]}
                      />
                    )}
                    <p>{item.name}</p>
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
