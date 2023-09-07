import { StyledAttribute, StyledAttributeContent, StyledAttributeHeader } from "./AttributeItem.styled";
import { Button, Flexbox, Input, Select } from "@mimirorg/component-library";
import { Attribute, Qualifier } from "../../../../lib";
import { useEffect, useState } from "react";
import { QuantityDatum, QuantityOption } from "../../../../lib/classes/QuantityDatum";

interface AttributeItemProps {
  attribute: Attribute;
  onInputChange: (id: string, value: string) => void;
  onUnitChange: (id: string, unit: string) => void;
  onQualifierChange: (id: string, qualifier: Qualifier[]) => void;
}

/**
 * Attribute item component
 * @param attribute - attribute to display
 * @param onInputChange - callback for when input changes
 * @param onUnitChange  - callback for when unit changes
 * @param onQualifierChange - callback for when qualifier changes
 * @constructor
 */

export const AttributeItem = ({ attribute, onInputChange, onUnitChange, onQualifierChange }: AttributeItemProps) => {
  const [inputValue, setInputValue] = useState<string>(attribute.value);
  const quantityDatum = new QuantityDatum();
  const [options, setOptions] = useState(quantityDatum.getCategoryOptions());

  useEffect(() => {
    setOptions(quantityDatum.getCategoryOptions());
  }, []);

  /**
   * if an option is selected in a category, disable the other options in the category
   */
  const handleChange = (selectedOptions: QuantityOption[]) => {
    const newOptions = JSON.parse(JSON.stringify(options));

    // Initialize a set to keep track of selected categories
    const selectedCategories = new Set<string>();

    // Create a map to store the latest selected option for each category
    const latestSelectedForCategory = new Map<string, QuantityOption>();

    selectedOptions.forEach((selected) => {
      const category = newOptions.find((group) => group.options.some((option) => option.value === selected.value))?.category;
      if (category) {
        latestSelectedForCategory.set(category, selected);
      }
    });

    // Reset all isDisabled flags and update based on latest selected option for each category
    newOptions.forEach((group) => {
      group.options.forEach((option) => {
        option.isDisabled = false;
      });

      const latestSelected = latestSelectedForCategory.get(group.category as string);
      if (latestSelected) {
        selectedCategories.add(group.category as string);
        group.options.forEach((option) => {
          option.isDisabled = option.value !== latestSelected.value;
        });
      }
    });

    setOptions(newOptions);

    // Update the selected options to only include the latest selected option for each category
    const updatedSelectedOptions = Array.from(latestSelectedForCategory.values());

    onQualifierChange(
      attribute.id,
      updatedSelectedOptions.map((option) => {
        return new Qualifier(option.label, option.value);
      })
    );
  };

  return (
    <StyledAttribute key={attribute.id}>
      <StyledAttributeHeader>
        <p>{attribute.name}</p>
      </StyledAttributeHeader>
      <StyledAttributeContent>
        <Select
          value={attribute.qualifiers.map((qualifier) => {
            return { value: qualifier.value, label: qualifier.name };
          })}
          isMulti={true}
          isSearchable={false}
          hideSelectedOptions={false}
          options={options}
          minMenuHeight={100}
          menuPlacement={"auto"}
          onChange={handleChange}
          variant={"standard"}
        />
      </StyledAttributeContent>
      <StyledAttributeContent>
        <Input type={"text"} defaultValue={inputValue} onChange={(e) => setInputValue(e.target.value)} />

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
