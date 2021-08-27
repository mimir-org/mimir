import "./dropdownmenu.scss";
import { useState, useEffect } from "react";
import { Aspect, ObjectType } from "../../../../models";
import { TypeEditorState } from "../../../../redux/store/typeEditor/types";
import { ExpandIcon, CollapseIcon } from "../../../../assets/icons/common";
import {
  GetDefaultValue,
  GetTypeValue,
  LocationDropdown,
  IsLocation,
  ModeEdit,
  ModeNew,
} from "../helpers";
import {
  DropdownMenuWrapper,
  DropdownMenuHeader,
  DropdownMenuList,
  DropdownMenuListItem,
} from "../../../../compLibrary/dropdown";
import { TextResources } from "../../../../assets/text";
interface Props {
  label: string;
  items: any[];
  type: Aspect | ObjectType;
  onChange: Function;
  disabled?: boolean;
  state: TypeEditorState;
}

export const DropDownMenu = ({
  label,
  items,
  type,
  onChange,
  disabled,
  state,
}: Props) => {
  const [isListOpen, setIsListOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(GetDefaultValue(type));

  useEffect(() => {
    if (
      ModeNew(state.mode) &&
      state.createLibraryType.aspect === Aspect.NotSet
    ) {
      setSelectedValue(GetDefaultValue(type));
    }
    if (ModeEdit(state.mode)) {
      setSelectedValue(GetTypeValue(state, label));
    }
  }, [type, state, label]);

  const toggleList = () => {
    setIsListOpen(!isListOpen);
  };

  const handleChange = ([key, value]) => {
    setSelectedValue(value);
    setIsListOpen(!isListOpen);
    onChange(key);
  };

  return (
    <DropdownMenuWrapper disabled={disabled}>
      <label htmlFor={label} />
      <div className="label"> {label}</div>
      <div onClick={disabled ? null : toggleList}>
        <DropdownMenuHeader>
          <p>{selectedValue}</p>
          <img src={isListOpen ? ExpandIcon : CollapseIcon} alt="expand-icon" />
        </DropdownMenuHeader>
      </div>
      {isListOpen && (
        <DropdownMenuList>
          {IsLocation(state.createLibraryType.aspect) &&
          label === TextResources.TypeEditor_Location_Type ? (
            <LocationDropdown
              mode={state.mode}
              listItems={items}
              setSelectedValue={setSelectedValue}
              setIsListOpen={setIsListOpen}
              isListOpen={isListOpen}
            ></LocationDropdown>
          ) : (
            items?.map(([key, value]) => (
              <div
                className="listitem"
                key={key}
                onClick={() => handleChange([key, value])}
              >
                <DropdownMenuListItem>
                  <p>{value}</p>
                </DropdownMenuListItem>
              </div>
            ))
          )}
        </DropdownMenuList>
      )}
    </DropdownMenuWrapper>
  );
};

export default DropDownMenu;
