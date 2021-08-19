import "./AddTerminal/directiondropdown.scss";
import "../../inputs/checkbox.scss";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { TypeEditorState } from "../../../../../redux/store/typeEditor/types";
import { PredefinedAttribute } from "../../../../../models";
import {
  OnChange,
  OnMultipleValuesChange,
  OnSingleValueChange,
} from "./helpers";
import {
  HelpIcon,
  ExpandIcon,
  CollapseIcon,
} from "../../../../../assets/icons/common";
import {
  TerminalListElement,
  TerminalCategoryWrapper,
  SelectValue,
  ValueHeader,
  ValuesListWrapper,
  ValuesListItem,
} from "../../styled";

interface Props {
  name: string;
  values: object;
  isMultiSelect: boolean;
  state: TypeEditorState;
}

export const AttributesListElement = ({
  name,
  values,
  isMultiSelect,
  state,
}: Props) => {
  const dispatch = useDispatch();
  const [expandList, setExpandList] = useState(false);
  const predefinedAttributes = state.createLibraryType.predefinedAttributes;

  const toggleValuesList = () => {
    setExpandList(!expandList);
  };

  const locationAttribute = {
    key: name,
    values: values,
    isMultiSelect: isMultiSelect,
  } as PredefinedAttribute;

  const locationAttributes = predefinedAttributes;

  const isSelected = locationAttributes.some(
    (a) => a.key === locationAttribute.key
  );

  const onCheckboxChange = () => {
    OnChange(
      state.mode,
      locationAttribute,
      locationAttributes,
      isSelected,
      dispatch
    );
  };

  const onSingleValueCheckboxChange = (e) => {
    OnSingleValueChange(
      e,
      name,
      predefinedAttributes,
      isMultiSelect,
      state.mode,
      dispatch
    );
  };

  const onMultipleValuesCheckboxChange = ([param_key, param_value]) => {
    OnMultipleValuesChange(
      [param_key, param_value],
      name,
      predefinedAttributes,
      isMultiSelect,
      state.mode,
      dispatch
    );
  };

  return (
    <TerminalListElement>
      <TerminalCategoryWrapper>
        <label className={"squarecheckbox"}>
          <input
            type="checkbox"
            defaultChecked={isSelected}
            id={name}
            onChange={onCheckboxChange}
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
                .filter(([_key, value]) => value === true)
                .map(([key, _value]) => {
                  return (
                    <span key={key}>
                      {key}
                      {isMultiSelect ? ", " : null}
                    </span>
                  );
                })}
            </p>
            <img
              src={expandList ? ExpandIcon : CollapseIcon}
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
                      {isMultiSelect ? (
                        <input
                          type="checkbox"
                          defaultChecked={value}
                          id={key}
                          onChange={() =>
                            onMultipleValuesCheckboxChange([key, value])
                          }
                        />
                      ) : (
                        <input
                          type="radio"
                          defaultChecked={value}
                          name="attribute"
                          value={key}
                          id={key}
                          onChange={onSingleValueCheckboxChange}
                        />
                      )}
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
