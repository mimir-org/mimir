import { ValuesListWrapper, ValuesListItem } from "../../../styled";
import { Checkbox } from "../../../../compLibrary/checkbox/common";
import { RadioButton } from "../../../../compLibrary/radioButton";
import { AttributeName } from "../../../inputs/styled";
import { OnMultipleValuesChange, OnSingleValueChange } from ".";
import { PredefinedAttribute } from "../../../../models";
import { OnPropertyChangeFunction } from "../../../types";

interface Props {
  isMultiSelect: boolean;
  getValues: () => object;
  attributeName: string;
  defaultValue: PredefinedAttribute[];
  onChange: OnPropertyChangeFunction;
}

const LocationValue = ({ isMultiSelect, getValues, attributeName, defaultValue, onChange }: Props) => {
  const onMultipleValuesChange = ([param_key, param_value]) => {
    OnMultipleValuesChange([param_key, param_value], attributeName, defaultValue, isMultiSelect, onChange);
  };

  return (
    <ValuesListWrapper>
      {Object.entries(getValues()).map(([key, value]) => {
        return (
          <ValuesListItem key={key}>
            {isMultiSelect ? (
              <Checkbox isChecked={value} onChange={() => onMultipleValuesChange} id={key} />
            ) : (
              <RadioButton
                isChecked={value}
                onChange={(e) => OnSingleValueChange(e, attributeName, defaultValue, isMultiSelect, onChange)}
                id={key}
              />
            )}
            <AttributeName htmlFor={key}>{key}</AttributeName>
          </ValuesListItem>
        );
      })}
    </ValuesListWrapper>
  );
};

export default LocationValue;
