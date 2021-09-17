import { useState, useEffect } from "react";
import { ExpandIcon, CollapseIcon } from "../../assets/icons/common";
import {
  DropdownMenuWrapper,
  DropdownMenuHeader,
  DropdownMenuList,
  DropdownMenuListItem,
  Symbol,
} from ".";
import { LocationTypeCategory } from "../../components/modules/typeEditorModule/styled";
export interface DropDownItem {
  name: string;
  items: any[];
}
interface Props {
  label: string;
  items: DropDownItem[];
  keyProp: string;
  valueProp: string;
  onChange: Function;
  defaultValue?: string;
  valueImageProp?: string;
  disabled?: boolean;
  hasCategory?: boolean;
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
  hasCategory,
}: Props) => {
  const [isListOpen, setIsListOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const findSelectedItem = () => {
    let selected = null as any;

    items?.forEach((x) => {
      x.items?.forEach((y) => {
        if (y[keyProp] == defaultValue) {
          selected = y;
        }
      });
    });
    return selected;
  };

  useEffect(() => {
    if (!items) {
      setSelectedItem(null);
      return;
    }
    if (defaultValue) {
      const selectedItem = findSelectedItem();
      setSelectedItem(selectedItem);
      return;
    }
    setSelectedItem(items[0]?.items[0]);
  }, [defaultValue, items, keyProp]);

  const handleChange = (_e: any, value: any) => {
    setSelectedItem(value);
    setIsListOpen(!isListOpen);
    onChange(value.id);
  };

  const getCategory = (item: DropDownItem) => {
    return (
      <LocationTypeCategory>
        <p>{item.name}</p>
      </LocationTypeCategory>
    );
  };

  const getItems = (items: any[]) => {
    return items?.map((item) => {
      return (
        <div onClick={(e) => handleChange(e, item)} key={item[keyProp]}>
          <DropdownMenuListItem hasCategory={hasCategory}>
            {valueImageProp && (
              <Symbol base64={item[valueImageProp]} text={item[valueProp]} />
            )}
            <p>{item.name}</p>
          </DropdownMenuListItem>
        </div>
      );
    });
  };

  return (
    <>
      <DropdownMenuWrapper disabled={disabled}>
        <label htmlFor={label} />
        <div className="label"> {label}</div>
        <div onClick={disabled ? null : (e) => setIsListOpen(!isListOpen)}>
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
                  src={isListOpen ? ExpandIcon : CollapseIcon}
                  alt="expand-icon"
                />
              </>
            )}
          </DropdownMenuHeader>
        </div>
        {isListOpen && (
          <DropdownMenuList>
            {items?.map((category) => {
              return (
                <div key={category.name}>
                  {hasCategory && getCategory(category)}
                  {getItems(category.items)}
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
