import { useState } from "react";
import { useDispatch } from "react-redux";
import { Aspect } from "../../../../models";
import {
  changeLocationType,
  changeSelectedAspect,
  changeSelectedObjecttype,
  changeStatus,
} from "../../../../redux/store/typeEditor/actions";
import GetRightMargin from "../helper/GetRightMargin";
import { ExpandedIcon, CollapsedIcon } from "../../../../assets/icons/common";
import { LocationTypeCategory, LocationSubType } from "../styled";
import {
  DropdownMenuWrapper,
  DropdownMenuHeader,
  DropdownMenuList,
  DropdownMenuListItem,
} from "../../../../compLibrary/dropdown";
import "./dropdownmenu.scss";

interface Props {
  aspect?: Aspect;
  label: string;
  placeHolder: string;
  listItems: any;
}

export const DropDownMenu = ({
  aspect,
  label,
  placeHolder,
  listItems,
}: Props) => {
  const dispatch = useDispatch();

  const [isListOpen, setIsListOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(placeHolder);

  const toggleList = () => {
    setIsListOpen(!isListOpen);
  };

  const handleChange = ([key, value]) => {
    setSelectedValue(value);
    setIsListOpen(!isListOpen);
    if (label === "Aspect") {
      dispatch(changeSelectedAspect(Number(key)));
    } else if (label === "Object Type") {
      dispatch(changeSelectedObjecttype(Number(key)));
    } else if (label === "Status") {
      dispatch(changeStatus(Number(key)));
    }
    toggleList();
  };

  const updateLocationType = (locationTypeId, locationName) => {
    setSelectedValue(locationName);
    dispatch(changeLocationType(locationTypeId));
    toggleList();
  };

  return (
    <>
      <DropdownMenuWrapper right={GetRightMargin(label)}>
        <label htmlFor={label} />
        {label}
        <div onClick={toggleList}>
          <DropdownMenuHeader>
            <p>{selectedValue}</p>
            <img
              src={isListOpen ? ExpandedIcon : CollapsedIcon}
              alt="expand-icon"
              onClick={toggleList}
            />
          </DropdownMenuHeader>
        </div>
        {isListOpen && (
          <DropdownMenuList>
            {aspect === Aspect.Location
              ? listItems.map((item) => {
                  return (
                    <div key={item[1].id}>
                      {item.map((type) => {
                        return (
                          <div key={type}>
                            {type.name && (
                              <div className="listitem" key={type.id}>
                                <LocationTypeCategory>
                                  <p>{type.name}</p>
                                </LocationTypeCategory>
                                {type.locationSubTypes.map((subType) => {
                                  return (
                                    <LocationSubType
                                      key={subType.id}
                                      onClick={() =>
                                        updateLocationType(
                                          subType.id,
                                          subType.name
                                        )
                                      }
                                    >
                                      <p>{subType.name}</p>
                                    </LocationSubType>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  );
                })
              : listItems.map(([key, value]) => (
                  <div
                    className="listitem"
                    key={key}
                    onClick={() => handleChange([key, value])}
                  >
                    <DropdownMenuListItem>
                      <p>{value}</p>
                    </DropdownMenuListItem>
                  </div>
                ))}
          </DropdownMenuList>
        )}
      </DropdownMenuWrapper>
    </>
  );
};

export default DropDownMenu;
