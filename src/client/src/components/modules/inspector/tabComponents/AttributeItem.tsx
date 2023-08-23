import { StyledAttribute, StyledAttributeContent, StyledAttributeHeader } from "./AttributeItem.styled";
import { Button, Flexbox, Input, Select } from "@mimirorg/component-library";
import { Attribute } from "../../../../lib";
import { useState } from "react";

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
  return (
    <StyledAttribute key={attribute.id}>
      <StyledAttributeHeader>
        <p>{attribute.name}</p>
      </StyledAttributeHeader>
      <StyledAttributeContent>
        <Input type={"text"} defaultValue={inputValue} onChange={(e) => setInputValue(e.target.value)} />
        <Select
          defaultValue={attribute.getUnitsAsLabelValue().find((unit) => unit.value === attribute.unitSelected)}
          options={attribute.getUnitsAsLabelValue()}
          onChange={(e) => onUnitChange(attribute.id, e.value)}
        />
        {attribute.value !== inputValue && (
          <Flexbox flexDirection={"row"} justifyContent={"center"} alignItems={"center"}>
            <Button variant={"outline"} onClick={() => onInputChange(attribute.id, inputValue)}>
              Save
            </Button>
          </Flexbox>
        )}
      </StyledAttributeContent>
    </StyledAttribute>
  );
};
