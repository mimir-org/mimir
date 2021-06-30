import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store";
import { TypeEditorState } from "../../../../../redux/store/typeEditor/types";
import { updatePredefinedAttributes } from "../../../../../redux/store/typeEditor/actions";
import { PredefinedAttribute } from "../../../../../models";

import {
  HelpIcon,
  ExpandedIcon,
  CollapsedIcon,
} from "../../../../../assets/icons/common";
import "./AddTerminal/directiondropdown.scss";
import {
  TerminalListElement,
  TerminalCategoryWrapper,
  SelectValue,
  ValueHeader,
  ValuesListWrapper,
  ValuesListItem,
} from "../../styled";
import "../../inputs/checkbox.scss";
import { useState } from "react";

interface Props {
  name: string;
  values: object;
  isMultiSelect: boolean;
}

export const AttributesListElement = ({
  name,
  values,
  isMultiSelect,
}: Props) => {
  const [expandList, setExpandList] = useState(false);

  const dispatch = useDispatch();

  const state = useSelector<RootState>(
    (state) => state.typeEditor
  ) as TypeEditorState;

  const toggleValuesList = () => {
    setExpandList(!expandList);
  };

  let locationAttribute: PredefinedAttribute = {
    key: name,
    values: values,
    isMultiSelect: isMultiSelect,
  };

  let isSelected = state.createLibraryType.predefinedAttributes.some(
    (a) => a.key === locationAttribute.key
  );

  const handleCheckboxChange = () => {
    let locationAttributes = state.createLibraryType.predefinedAttributes;
    let temp: PredefinedAttribute[];
    if (locationAttribute) {
      if (isSelected) {
        temp = locationAttributes.filter(
          (a) => a.key !== locationAttribute.key
        );
        dispatch(updatePredefinedAttributes(temp));
      } else if (!isSelected) {
        locationAttributes.push(locationAttribute);
        dispatch(updatePredefinedAttributes(locationAttributes));
      }
    }
  };

  const handleValueCheckboxChange = ([param_key, param_value]) => {
    let attribute: PredefinedAttribute =
      state.createLibraryType.predefinedAttributes.find((a) => a.key === name);
    let valueslist = attribute.values;
    if (valueslist) {
      valueslist[param_key] = !param_value;
    }
    attribute = {
      key: name,
      values: valueslist,
      isMultiSelect: isMultiSelect,
    };
    let attributesList = state.createLibraryType.predefinedAttributes;
    attributesList = attributesList.map((a) => {
      if (a.key === attribute.key) {
        a = attribute;
      }
      return a;
    });
    dispatch(updatePredefinedAttributes(attributesList));
  };

  return (
    <TerminalListElement>
      <TerminalCategoryWrapper>
        <label className={"squarecheckbox"}>
          <input
            type="checkbox"
            defaultChecked={isSelected}
            id={name}
            onChange={handleCheckboxChange}
          />
          <span className="scheckmark"></span>
          <label htmlFor={name}></label>
        </label>
        <p className="locationAttribute">{name}</p>
        <img className="help-icon" src={HelpIcon} alt="help" />
      </TerminalCategoryWrapper>
      {isSelected && (
        <SelectValue>
          <ValueHeader onClick={toggleValuesList}>
            <p className="selectedValues">
              {Object.entries(values)
                .filter(([key, value]) => value === true)
                .map(([key, value]) => {
                  return <span key={key}>{key}, </span>;
                })}
            </p>
            <img
              src={expandList ? ExpandedIcon : CollapsedIcon}
              alt="expand-icon"
              onClick={toggleValuesList}
              className="icon"
            />
          </ValueHeader>
          {expandList && (
            <ValuesListWrapper>
              {Object.entries(values).map(([key, value]) => {
                return (
                  <ValuesListItem key={key}>
                    <label className={"squarecheckbox"}>
                      <input
                        type="checkbox"
                        defaultChecked={value}
                        id={key}
                        onChange={() => handleValueCheckboxChange([key, value])}
                      />
                      <span className="scheckmark"></span>
                      <label htmlFor={key}></label>
                    </label>
                    <p>{key}</p>
                    <img className="help-icon" src={HelpIcon} alt="help" />
                  </ValuesListItem>
                );
              })}
            </ValuesListWrapper>
          )}
        </SelectValue>
      )}
    </TerminalListElement>
  );
};

export default AttributesListElement;
