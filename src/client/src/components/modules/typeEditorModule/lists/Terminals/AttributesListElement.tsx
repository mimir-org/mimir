import "./AddTerminal/directiondropdown.scss";
import "../../inputs/checkbox.scss";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { TypeEditorState } from "../../../../../redux/store/typeEditor/types";
import { updatePredefinedAttributes } from "../../../../../redux/store/typeEditor/actions";
import { PredefinedAttribute } from "../../../../../models";
import {
  HelpIcon,
  ExpandedIcon,
  CollapsedIcon,
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

  const toggleValuesList = () => {
    setExpandList(!expandList);
  };

  const locationAttribute: PredefinedAttribute = {
    key: name,
    values: values,
    isMultiSelect: isMultiSelect,
  };

  const locationAttributes = state.createLibraryType.predefinedAttributes;
  const isSelected = locationAttributes.some(
    (a) => a.key === locationAttribute.key
  );

  const onCheckboxChange = () => {
    let temp: PredefinedAttribute[];
    if (locationAttribute) {
      if (isSelected) {
        temp = locationAttributes.filter(
          (a) => a.key !== locationAttribute.key
        );
        dispatch(updatePredefinedAttributes(temp));
      } else {
        locationAttributes.push(locationAttribute);
        dispatch(updatePredefinedAttributes(locationAttributes));
      }
    }
  };

  const onMultipleValuesCheckboxChange = ([param_key, param_value]) => {
    let attribute: PredefinedAttribute =
      state.createLibraryType.predefinedAttributes.find((a) => a.key === name);
    const valueslist = attribute.values;
    if (valueslist) valueslist[param_key] = !param_value;

    attribute = {
      key: name,
      values: valueslist,
      isMultiSelect: isMultiSelect,
    };
    let attributesList = state.createLibraryType.predefinedAttributes;

    attributesList = attributesList.map((a) => {
      if (a.key === attribute.key) a = attribute;
      return a;
    });
    dispatch(updatePredefinedAttributes(attributesList));
  };

  const onSingleValueCheckboxChange = (e) => {
    const targetKey = e.target.value;
    let attribute: PredefinedAttribute =
      state.createLibraryType.predefinedAttributes.find((a) => a.key === name);
    let valueslist = attribute.values;
    if (valueslist) valueslist[targetKey] = !valueslist[targetKey];

    const entries = Object.entries(valueslist).filter(
      ([key, _value]) => key !== targetKey
    );
    entries.forEach(([key, value]) => {
      if (value) valueslist[key] = false;
      return [key, value];
    });

    attribute = {
      key: name,
      values: valueslist,
      isMultiSelect: isMultiSelect,
    };

    let attributesList = state.createLibraryType.predefinedAttributes;
    attributesList = attributesList.map((a) => {
      if (a.key === attribute.key) a = attribute;
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
                      <span className="checkmark"></span>
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
