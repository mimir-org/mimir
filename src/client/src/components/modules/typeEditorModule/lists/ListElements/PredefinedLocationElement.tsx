import { useState } from "react";
import { PredefinedAttribute } from "../../../../../models";
import { Checkbox } from "../../inputs";
import { ExpandIcon, CollapseIcon } from "../../../../../assets/icons/chevron";
import { OnMultipleValuesChange, OnSingleValueChange } from "./helpers";
import { Label } from "../../inputs/Checkbox";
import {
  TerminalListElement,
  TerminalCategoryWrapper,
  SelectValue,
  ValueHeader,
  ValuesListWrapper,
  ValuesListItem,
} from "../../styled";

interface Props {
  attributeName: string;
  values: object;
  isMultiSelect: boolean;
  defaultValue?: PredefinedAttribute[];
  onChange: Function;
}

export const PredefinedLocationElement = ({ attributeName, values, isMultiSelect, defaultValue, onChange }: Props) => {
  const [expandList, setExpandList] = useState(false);
  const isSelected = defaultValue.some((a) => a.key === attributeName);

  const locationAttribute = {
    key: attributeName,
    values: values,
    isMultiSelect: isMultiSelect,
  } as PredefinedAttribute;

  const onCheckboxChange = () => {
    let attributes = defaultValue;
    if (isSelected) {
      attributes = attributes.filter((a) => a.key !== locationAttribute.key);
    } else {
      attributes.push(locationAttribute);
    }
    onChange("predefinedAttributes", attributes);
  };

  const getValues = () => {
    let attribute: PredefinedAttribute;
    if (isSelected) {
      attribute = defaultValue.find((a) => a.key === attributeName);
      return attribute.values;
    } else {
      return values;
    }
  };

  const onSingleValueCheckboxChange = (e) => {
    OnSingleValueChange(e, attributeName, defaultValue, isMultiSelect, onChange);
  };

  const onMultipleValuesCheckboxChange = ([param_key, param_value]) => {
    OnMultipleValuesChange([param_key, param_value], attributeName, defaultValue, isMultiSelect, onChange);
  };

  return (
    <TerminalListElement>
      <TerminalCategoryWrapper isSelected={isSelected}>
        <Checkbox
          id={attributeName}
          name={attributeName}
          label={Label.Terminals}
          defaultValue={defaultValue}
          onChange={onCheckboxChange}
        />
      </TerminalCategoryWrapper>
      {isSelected && (
        <SelectValue isSelected={isSelected}>
          <ValueHeader onClick={() => setExpandList(!expandList)}>
            <p className="selectedValues">
              {Object.entries(getValues())
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
              onClick={() => setExpandList(!expandList)}
              className="icon"
            />
          </ValueHeader>
          {expandList && (
            <ValuesListWrapper>
              {Object.entries(getValues()).map(([key, value]) => {
                return (
                  <ValuesListItem key={key}>
                    <label className={"squarecheckbox"}>
                      {isMultiSelect ? (
                        <>
                          <input
                            type="checkbox"
                            defaultChecked={value}
                            id={key}
                            onChange={() => onMultipleValuesCheckboxChange([key, value])}
                          />
                        </>
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
                      <label className="label" htmlFor={key}>
                        {key}
                      </label>
                    </label>
                    {/* <p>{key}</p> */}
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

export default PredefinedLocationElement;
