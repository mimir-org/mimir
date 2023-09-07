import { StyledAttribute, StyledAttributeContent, StyledAttributeHeader } from "./AttributeItem.styled";
import { Button, Flexbox, Input, Select } from "@mimirorg/component-library";
import { Attribute } from "../../../../lib";
import { useEffect, useState } from "react";
import { QuantityDatum, QuantityOption } from "../../../../lib/classes/QuantityDatum";

interface AttributeItemProps {
  attribute: Attribute;
  onInputChange: (id: string, value: string) => void;
  onUnitChange: (id: string, unit: string) => void;
}

/**
 * Attribute item component
 * @param attribute - attribute to display
 * @param onInputChange - callback for when input changes
 * @param onUnitChange  - callback for when unit changes
 * @constructor
 */

export const AttributeItem = ({ attribute, onInputChange, onUnitChange }: AttributeItemProps) => {
  const [inputValue, setInputValue] = useState<string>(attribute.value);
  const [selectedOptions, setSelectedOptions] = useState<QuantityOption[]>([]);
  const quantityDatum = new QuantityDatum();
  const [options, setOptions] = useState(quantityDatum.getCategoryOptions());

  useEffect(() => {
    setOptions(quantityDatum.getCategoryOptions());
  }, []);

  const handleChange = (selectedOptions: QuantityOption[]) => {
    const newOptions = JSON.parse(JSON.stringify(options));

    // Initialize a set to keep track of selected categories
    const selectedCategories = new Set<string>();

    // If selectedOptions is empty or null, reset all isDisabled flags
    if (!selectedOptions || selectedOptions.length === 0) {
      newOptions.forEach((group) => {
        group.options.forEach((option) => {
          option.isDisabled = false;
        });
      });
    } else {
      // Populate the set with the categories of the selected options
      newOptions.forEach((group) => {
        if (selectedOptions.some((selected) => group.options.some((option) => option.value === selected.value))) {
          selectedCategories.add(group.category as string);
        }
      });

      // Update 'isDisabled' for options in selected categories
      newOptions.forEach((group) => {
        if (selectedCategories.has(group.category as string)) {
          group.options.forEach((option) => {
            option.isDisabled = !selectedOptions.some((selected) => selected.value === option.value);
          });
        }
      });
    }

    setOptions(newOptions);
    setSelectedOptions(selectedOptions); // Update the selected options
  };

  return (
    <StyledAttribute key={attribute.id}>
      <StyledAttributeHeader>
        <p>{attribute.name}</p>
      </StyledAttributeHeader>
      <StyledAttributeContent>
        <Input type={"text"} defaultValue={inputValue} onChange={(e) => setInputValue(e.target.value)} />
        <Select
          value={selectedOptions}
          isMulti
          options={options}
          onChange={
            // if an option is selected in category, disable the other options in the category
            handleChange
          }
        />

        <Select
          defaultValue={attribute.getUnitsAsLabelValue().find((unit) => unit.value === attribute.unitSelected)}
          options={attribute.getUnitsAsLabelValue()}
          onChange={(e: { value: string }) => onUnitChange(attribute.id, e.value)}
        />
        {attribute.value !== inputValue && (
          <Flexbox flexDirection={"row"} justifyContent={"center"} alignItems={"center"}>
            <Button variant={"outlined"} onClick={() => onInputChange(attribute.id, inputValue)}>
              Save
            </Button>
          </Flexbox>
        )}
      </StyledAttributeContent>
    </StyledAttribute>
  );
};
