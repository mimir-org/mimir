import { useState } from "react";
import { PredefinedAttribute } from "../../../models";
import { CheckboxContainer } from "../../inputs";
import { LocationValueHeader, LocationValue } from "./helpers";
import { Label } from "../../inputs/CheckboxContainer";
import { OnPropertyChangeFunction } from "../../types";
import { TerminalListElement, TerminalCategoryWrapper, SelectValue } from "../../styled";

interface Props {
  attributeName: string;
  values: object;
  isMultiSelect: boolean;
  defaultValue?: PredefinedAttribute[];
  onChange: OnPropertyChangeFunction;
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
    }
    return values;
  };

  return (
    <TerminalListElement>
      <TerminalCategoryWrapper isSelected={isSelected}>
        <CheckboxContainer
          id={attributeName}
          name={attributeName}
          label={Label.Terminals}
          defaultValue={defaultValue}
          onChange={onCheckboxChange}
        />
      </TerminalCategoryWrapper>

      {isSelected && (
        <SelectValue isSelected={isSelected}>
          <LocationValueHeader
            isMultiSelect={isMultiSelect}
            expandList={expandList}
            setExpandList={setExpandList}
            getValues={getValues}
          />
          {expandList && (
            <LocationValue
              getValues={getValues}
              isMultiSelect={isMultiSelect}
              onChange={onChange}
              attributeName={attributeName}
              defaultValue={defaultValue}
            />
          )}
        </SelectValue>
      )}
    </TerminalListElement>
  );
};

export default PredefinedLocationElement;
