import { useState } from "react";
import { TextResources } from "../../../../../../../assets/text";
import {
  MenuWrapper,
  MenuHeader,
  MenuList,
  MenuListItem,
  CheckboxWrapper,
} from "./styled";
import {
  ExpandWhiteIcon,
  CollapseWhiteIcon,
} from "../../../../../../../assets/icons/common";

interface Props {
  items: any[];
  keyProp: string;
  onChange: Function;
  color: string;
}

const EntityDropdown = ({ items, keyProp, onChange, color }: Props) => {
  const [isListOpen, setIsListOpen] = useState(false);

  const handleChange = (_e: any, value: any) => {
    onChange(value);
  };

  return (
    <MenuWrapper>
      <div onClick={(e) => setIsListOpen(!isListOpen)}>
        <MenuHeader open={isListOpen}>
          <p>{TextResources.Inspector_Params_Combinations}</p>
          <img
            src={isListOpen ? ExpandWhiteIcon : CollapseWhiteIcon}
            alt="expand-icon"
          />
        </MenuHeader>
      </div>
      {isListOpen && (
        <MenuList>
          {items?.map((item) => {
            return (
              <div onClick={(e) => handleChange(e, item)} key={item[keyProp]}>
                <MenuListItem color={color}>
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
  );
};

export default EntityDropdown;
