import { useEffect, useState } from "react";
import { AttributeDescriptor } from "./AttributeDescriptor";
import { AttributeHeaderBox, AttributeObjectBody, AttributeObjectBox } from "./AttributeObject.styled";
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

  const descriptorsAmount = GetDescriptorAmount(combination);
  const hasDescriptors = descriptorsAmount > 0;
  const singleColumn = descriptorsAmount < 3;

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
          <AttributeDescriptor
            specifiedScope={combination.specifiedScope}
            specifiedProvenance={combination.specifiedProvenance}
            rangeSpecifying={combination.rangeSpecifying}
            regularitySpecified={combination.regularitySpecified}
            headerColor={headerColor}
            bodyColor={bodyColor}
            descriptorsAmount={descriptorsAmount}
            singleColumn={singleColumn}
          />
        )}
      </AttributeObjectBody>
      <AttributeInput
        attribute={attribute}
        value={value}
        singleColumn={singleColumn}
        setValue={setValue}
        onChange={(id, value, unitId) => onChange(id, value, unitId)}
      />
    </AttributeObjectBox>
  );
};

function GetDescriptorAmount(combination: CombinedAttribute) {
  let count = 0;
  if (combination.specifiedScope != undefined && combination.specifiedScope != null) count++;
  if (combination.specifiedProvenance != undefined && combination.specifiedProvenance != null) count++;
  if (combination.rangeSpecifying != undefined && combination.rangeSpecifying != null) count++;
  if (combination.regularitySpecified != undefined && combination.regularitySpecified != null) count++;
  return count;
}
