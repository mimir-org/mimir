import { useState, useEffect, useCallback } from "react";
import { ExpandIcon, CollapseIcon } from "../../../assets/icons/chevron";
import { LocationTypeCategory } from "../../../typeEditor/styled";
import { Symbol } from "../../symbol";
import { DropdownMenuWrapper, DropdownMenuHeader, DropdownMenuList, DropdownMenuListItem } from "./styled";

export interface DropDownItem {
  id: string;
  name: string;
  description: string;
  items: DropDownItem[];
  image: string;
}

interface Props {
  label: string;
  items: DropDownItem[];
  onChange: Function;
  defaultValue?: string;
  disabled?: boolean;
  hasCategory?: boolean;
  placeholder?: string;
}

const Dropdown = ({ label, items, onChange, defaultValue, disabled, hasCategory, placeholder }: Props) => {
  const [isListOpen, setIsListOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null as DropDownItem);

  const findSelectedItem = useCallback(() => {
    let selected = null as DropDownItem;

    items?.forEach((x) => {
      x.items?.forEach((y) => {
        if (y.id === defaultValue) {
          selected = y;
        }
      });
    });
    return selected;
  }, [defaultValue, items]);

  useEffect(() => {
    if (!items) {
      setSelectedItem(null);
      return;
    }
    if (defaultValue) {
      const _selectedItem = findSelectedItem();
      setSelectedItem(_selectedItem);
      return;
    }
  }, [defaultValue, findSelectedItem, items]);

  const handleChange = (_e: any, value: DropDownItem) => {
    setSelectedItem(value);
    setIsListOpen(!isListOpen);
    onChange(value.id);
  };

  const getCategory = (item: DropDownItem) => {
    return (
      <LocationTypeCategory>
        <p>{item.description}</p>
      </LocationTypeCategory>
    );
  };

  const getItems = (items: DropDownItem[]) => {
    return items?.map((item) => {
      return (
        <div onClick={(e) => handleChange(e, item)} key={item.id}>
          <DropdownMenuListItem>
            {item.image && <Symbol base64={item.image} text={item.description} />}
            <p>{item.description}</p>
          </DropdownMenuListItem>
        </div>
      );
    });
  };

  return (
    <>
      <DropdownMenuWrapper disabled={disabled}>
        <label htmlFor={label} />
        <div className="dropdown-label">{label}</div>
        <div onClick={disabled ? null : (e) => setIsListOpen(!isListOpen)}>
          <DropdownMenuHeader>
            {
              <>
                {selectedItem && selectedItem.image && (
                  <Symbol base64={selectedItem.image} text={selectedItem.description} />
                )}
                <p>{selectedItem?.description ?? placeholder}</p>
                <img src={isListOpen ? ExpandIcon : CollapseIcon} alt="expand-icon" />
              </>
            }
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
