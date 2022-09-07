import { useEffect, useState } from "react";
import { ParameterDescriptor } from "./ParameterDescriptor";
import { Entity } from "../styled/Entity";
import { ParameterButton, ParameterLockSpinner } from "../../../styled/ParameterButton";
import { ParameterHeader } from "./Parameter.styled";
import { CombinedAttribute } from "../../../../../../../../../../../models";
import { LockClosedParameterComponent, LockOpenComponent } from "../../../../../../../../../../../assets/icons/lock";
import { CloseIcon } from "../../../../../../../../../../../assets/icons/close";
import { IsAttribute } from "../../../../../../../../../helpers/IsType";
import { VisuallyHidden } from "../../../../../../../../../../../compLibrary/util";
import { TextResources } from "../../../../../../../../../../../assets/text/TextResources";
import { Spinner } from "../../../../../../../../../../../compLibrary/spinner";
import { Attribute } from "@mimirorg/modelbuilder-types";
import { ParameterInput } from "./ParameterInput";

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
  const lockDescription = isLocked ? TextResources.PARAMS_UNLOCK : TextResources.PARAMS_LOCK;

  const LockComponent = isLocked ? <LockClosedParameterComponent fill={headerColor} /> : <LockOpenComponent />;

  useEffect(() => {
    IsAttribute(attribute) && setValue(attributeValue);
  }, [attribute, attributeValue]);

  return (
    <Entity width={PARAMETER_ENTITY_WIDTH}>
      <ParameterHeader color={bodyColor}>
        <span>{attribute?.entity}</span>
        {isAttribute && (
          <>
            <ParameterButton onClick={() => isAttribute && onLock(attribute, !attribute.isLocked)}>
              <VisuallyHidden>{lockDescription}</VisuallyHidden>
              {attributeIsLocking ? (
                <ParameterLockSpinner>
                  <Spinner variant="small" />
                </ParameterLockSpinner>
              ) : (
                LockComponent
              )}
            </ParameterButton>
            <ParameterButton onClick={() => onClose(attribute.id)}>
              <VisuallyHidden>{TextResources.PARAMS_CLOSE}</VisuallyHidden>
              <img src={CloseIcon} alt="x mark" />
            </ParameterButton>
          </>
        )}
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
