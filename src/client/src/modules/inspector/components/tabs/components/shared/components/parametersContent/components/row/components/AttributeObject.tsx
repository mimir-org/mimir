import { useEffect, useState } from "react";
import { AttributeDescriptorComponent } from "./AttributeDescriptorComponent";
import { AttributeHeaderBox, AttributeObjectBody, AttributeObjectBox } from "./AttributeObject.styled";
import { CombinedAttribute } from "../../../../../../../../../../../models";
import { IsAttribute } from "../../../../../../../../../helpers/IsType";
import { Attribute } from "@mimirorg/modelbuilder-types";
import { AttributeInput } from "./AttributeInput";
import { AttributeObjectNameComponent } from "./AttributeObjectNameComponent";
import { AttributeButtonsComponent } from "./AttributeButtonsComponent";
import { GetAttributeDescriptors } from "./helpers/GetAttributeDesciptors";

export const PARAMETER_ENTITY_WIDTH = 255;

interface Props {
  attribute: Attribute;
  combination: CombinedAttribute;
  headerColor: string;
  bodyColor: string;
  isGloballyLocking: boolean;
  lockingAttribute: Attribute;
  onChange: (id: string, value: string, unitId: string) => void;
  onLock: (attribute: Attribute, isLocked: boolean) => void;
  onClose: (id: string) => void;
}

/**
 * Component for a single Attribute used in the Inspector.
 * @param interface
 * @returns an attribute with data, an input field and a dropdown for units.
 */
export const AttributeObject = ({
  attribute,
  combination,
  headerColor,
  bodyColor,
  isGloballyLocking,
  lockingAttribute,
  onLock,
  onClose,
  onChange,
}: Props) => {
  const [value, setValue] = useState("");
  const isAttribute = IsAttribute(attribute);
  const attributeValue = isAttribute ? attribute.value ?? "" : "";
  const isLocked = isAttribute ? attribute.isLocked : false;
  const attributeIsLocking = attribute === lockingAttribute && isGloballyLocking;
  const hasTypeReference = attribute?.typeReferences && attribute?.typeReferences?.length > 0;
  const descriptors = GetAttributeDescriptors(combination);

  const hasDescriptors = descriptors.length > 0;
  const singleColumn = descriptors.length < 3;

  useEffect(() => {
    IsAttribute(attribute) && setValue(attributeValue);
  }, [attribute, attributeValue]);

  return (
    <AttributeObjectBox singleColumn={singleColumn}>
      <AttributeHeaderBox color={bodyColor}>
        <AttributeObjectNameComponent attribute={attribute} hasTypeReference={hasTypeReference} />
        <AttributeButtonsComponent
          attribute={attribute}
          headerColor={headerColor}
          isAttribute={isAttribute}
          attributeIsLocking={attributeIsLocking}
          isLocked={isLocked}
          onClose={(id: string) => onClose(id)}
          onLock={(attribute: Attribute, isLocked: boolean) => onLock(attribute, isLocked)}
        />
      </AttributeHeaderBox>
      <AttributeObjectBody>
        {hasDescriptors && (
          <AttributeDescriptorComponent headerColor={headerColor} singleColumn={singleColumn} descriptors={descriptors} />
        )}
      </AttributeObjectBody>
      <AttributeInput
        attribute={attribute}
        value={value}
        singleColumn={singleColumn}
        hasDescriptors={hasDescriptors}
        setValue={setValue}
        onChange={(id, value, unitId) => onChange(id, value, unitId)}
      />
    </AttributeObjectBox>
  );
};
