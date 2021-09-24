import { useState, useEffect } from "react";
import {
  MenuWrapper,
  MenuHeader,
  MenuList,
  MenuListItem,
  CheckboxWrapper,
} from "./styled";
import {
  ExpandIcon,
  CollapseIcon,
} from "../../../../../../../assets/icons/common";

interface Props {
  items: any[];
  keyProp: string;
  valueProp: string;
  onChange: Function;
  defaultValue?: string;
}

const Dropdown = ({
  items,
  keyProp,
  valueProp,
  onChange,
  defaultValue,
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
    // setIsListOpen(!isListOpen);
    onChange(value);
  };

  return (
    <>
      <MenuWrapper>
        <div onClick={(e) => setIsListOpen(!isListOpen)}>
          <MenuHeader>
            {selectedItem && (
              <>
                <p>{selectedItem.name ?? selectedItem.key}</p>
                <img
                  src={isListOpen ? ExpandIcon : CollapseIcon}
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
                  <MenuListItem>
                    <p>{item.name ?? item.key}</p>
                    <CheckboxWrapper>
                      <label className={"checkbox-block"}>
                        <input
                          type="checkbox"
                          checked={true}
                          onChange={() => null}
                        />
                        <span className="checkmark-block"></span>
                      </label>
                    </CheckboxWrapper>
                  </MenuListItem>
                </div>
              );
            })}
          </MenuList>
        )}
      </MenuWrapper>
    </>
  );
};

export default Dropdown;
