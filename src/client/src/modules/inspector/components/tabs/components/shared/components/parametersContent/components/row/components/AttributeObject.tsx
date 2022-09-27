import { useEffect, useState } from "react";
import { AttributesDescriptor } from "./AttributeDescriptor";
import { Entity } from "../styled/Entity";
import { AttributeHeader } from "./AttributeObject.styled";
import { CombinedAttribute } from "../../../../../../../../../../../models";
import { IsAttribute } from "../../../../../../../../../helpers/IsType";
import { Attribute } from "@mimirorg/modelbuilder-types";
import { AttributeInput } from "./AttributeInput";
import { AttributeObjectNameComponent } from "./AttributeObjectNameComponent";
import { AttributeButtonsComponent } from "./AttributeButtonsComponent";

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
 * @param props
 * @returns an attribute with data for qualifier, source, condition, an input field and a dropdown for units.
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

  useEffect(() => {
    IsAttribute(attribute) && setValue(attributeValue);
  }, [attribute, attributeValue]);

  return (
    <Entity width={430}>
      <AttributeHeader color={bodyColor}>
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
      </AttributeHeader>
      <AttributesDescriptor
        specifiedScope={combination.specifiedScope}
        specifiedProvenance={combination.specifiedProvenance}
        rangeSpecifying={combination.rangeSpecifying}
        regularitySpecified={combination.regularitySpecified}
        headerColor={headerColor}
        bodyColor={bodyColor}
      />
      <AttributeInput
        attribute={attribute}
        value={value}
        setValue={setValue}
        onChange={(id, value, unitId) => onChange(id, value, unitId)}
      />
    </Entity>
  );
};
