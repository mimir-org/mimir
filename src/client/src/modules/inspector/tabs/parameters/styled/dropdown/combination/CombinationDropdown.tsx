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
import { CombinedAttribute } from "../../../../../../../models";

interface Props {
  items: CombinedAttribute[];
  selectedItems: CombinedAttribute[];
  keyProp: string;
  onChange: (combination: CombinedAttribute, selected: boolean) => void;
  color: string;
}

const EntityDropdown = ({
  items,
  selectedItems,
  keyProp,
  onChange,
  color,
}: Props) => {
  const [isListOpen, setIsListOpen] = useState(false);

  const IsItemSelected = (item: CombinedAttribute): boolean => {
    return !!selectedItems.find((other) => item.combined === other.combined);
  };

  return (
    <MenuWrapper tabIndex={0} onBlur={() => setIsListOpen(false)}>
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
              <div
                onClick={() => onChange(item, IsItemSelected(item))}
                key={item[keyProp]}
              >
                <MenuListItem color={color}>
                  <p>{item.combined}</p>
                  <CheckboxWrapper>
                    <label className={"checkbox-block"}>
                      <input
                        type="checkbox"
                        checked={IsItemSelected(item)}
                        readOnly={true}
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
