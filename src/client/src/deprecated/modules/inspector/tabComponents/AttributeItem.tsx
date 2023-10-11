import { StyledAttribute, StyledAttributeContent, StyledAttributeHeader } from "./AttributeItem.styled";
import { Button, Flexbox, Input, Select } from "@mimirorg/component-library";
import { Attribute, Qualifier } from "../../../../lib";
import { useState } from "react";
import { QuantityDatum, QuantityOption } from "../../../../lib/classes/QuantityDatum";
import { TextResources } from "../../../../assets/text/TextResources";

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
  const options = quantityDatum.getCategoryOptions();

  /**
   * Update input value when attribute value changes
   * @param selectedOptions - selected options
   */
  const handleChange = (selectedOptions: QuantityOption[]) => {
    const latestSelectedForCategory = new Map<string, QuantityOption>();

    selectedOptions.forEach((selected) => {
      const category = options.find((group) => group.options.some((option) => option.value === selected.value))?.category;
      if (category) {
        latestSelectedForCategory.set(category, selected);
      }
    });

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
              {TextResources.SAVE}
            </Button>
          </Flexbox>
        )}
      </StyledAttributeContent>
    </StyledAttribute>
  );
};
