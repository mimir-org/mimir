import { useEffect, useState } from "react";
import { ParameterDescriptor } from "./ParameterDescriptor";
import { Entity } from "../styled/Entity";
import { ParameterHeader } from "./Parameter.styled";
import { CombinedAttribute } from "../../../../../../../../../../../models";
import { IsAttribute } from "../../../../../../../../../helpers/IsType";
import { Attribute } from "@mimirorg/modelbuilder-types";
import { ParameterInput } from "./ParameterInput";
import { ParameterNameComponent } from "./ParameterNameComponent";
import { ParameterButtonsComponent } from "./ParameterButtonsComponent";

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
 * Component for a single Parameter used in the Inspector.
 * @param params
 * @returns a parameter with data for qualifier, source, condition, an input field and a dropdown for units.
 */
export const Parameter = ({
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
    <Entity width={PARAMETER_ENTITY_WIDTH}>
      <ParameterHeader color={bodyColor}>
        <ParameterNameComponent attribute={attribute} hasTypeReference={hasTypeReference} />
        <ParameterButtonsComponent
          attribute={attribute}
          headerColor={headerColor}
          isAttribute={isAttribute}
          attributeIsLocking={attributeIsLocking}
          isLocked={isLocked}
          onClose={(id: string) => onClose(id)}
          onLock={(attribute: Attribute, isLocked: boolean) => onLock(attribute, isLocked)}
        />
      </ParameterHeader>
      <ParameterDescriptor qualifier={combination.qualifier} source={combination.source} condition={combination.condition} />
      <ParameterInput
        attribute={attribute}
        value={value}
        setValue={setValue}
        onChange={(id, value, unitId) => onChange(id, value, unitId)}
      />
    </Entity>
  );
};
