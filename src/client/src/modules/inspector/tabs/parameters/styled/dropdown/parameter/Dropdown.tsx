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
import { TextResources } from "../../../../../../../assets/text";
import { Attribute } from "../../../../../../../models";

interface Props {
  items: Attribute[];
  selectedItems: string[];
  keyProp: string;
  onChange: (parameterId: string, selected: boolean) => void;
  defaultValue?: string;
}

const Dropdown = ({
  items,
  selectedItems,
  keyProp,
  onChange,
  defaultValue,
}: Props) => {
  const [isListOpen, setIsListOpen] = useState(false);

  useEffect(() => {
    if (!items) {
      return;
    }
    if (defaultValue) {
      return;
    }
  }, [defaultValue, items, keyProp]);

  const IsAttributeSelected = (attr: Attribute): boolean => {
    return selectedItems.includes(attr.id);
  };
  return (
    <>
      <MenuWrapper>
        <div onClick={(e) => setIsListOpen(!isListOpen)}>
          <MenuHeader>
            <>
              <p className="searchText">
                {TextResources.Inspector_Params_Search}
              </p>
              <img
                src={isListOpen ? ExpandIcon : CollapseIcon}
                alt="expand-icon"
              />
            </>
          </MenuHeader>
        </div>
        {isListOpen && (
          <MenuList>
            {items?.map((item) => {
              return (
                <div
                  onClick={() => onChange(item.id, IsAttributeSelected(item))}
                  key={item[keyProp]}
                >
                  <MenuListItem>
                    <p>{item.key}</p>
                    <CheckboxWrapper>
                      <label className={"checkbox-block"}>
                        <input
                          type="checkbox"
                          checked={IsAttributeSelected(item)}
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
