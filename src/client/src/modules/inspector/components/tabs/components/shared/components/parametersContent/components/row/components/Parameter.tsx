import { useEffect, useState } from "react";
import { ParameterDescriptor } from "./ParameterDescriptor";
import { Entity } from "../styled/Entity";
import { Color } from "../../../../../../../../../../../assets/color/Color";
import { ParameterButton, ParameterLockSpinner } from "../../../styled/ParameterButton";
import { ParameterHeader, ParameterInputsWrapper } from "./Parameter.styled";
import { Dropdown as CompDropdown } from "../../../../../../../../../../../compLibrary/dropdown/mimir/Dropdown";
import { Attribute, CombinedAttribute, EnumBase } from "../../../../../../../../../../../models";
import { LockClosedParameterComponent, LockOpenComponent } from "../../../../../../../../../../../assets/icons/lock";
import { CloseIcon } from "../../../../../../../../../../../assets/icons/close";
import { AttributeLikeItem } from "../../../../../../../../../types";
import { IsAttribute } from "../../../../../../../../../helpers/IsType";
import { FontSize } from "../../../../../../../../../../../assets/font";
import { VisuallyHidden } from "../../../../../../../../../../../compLibrary/util";
import { TextResources } from "../../../../../../../../../../../assets/text/TextResources";
import { Spinner } from "../../../../../../../../../../../compLibrary/spinner";

export const PARAMETER_ENTITY_WIDTH = 255;

interface Props {
  attribute: AttributeLikeItem;
  combination: CombinedAttribute;
  headerColor: string;
  bodyColor: string;
  isGloballyLocking: boolean;
  lockingAttribute: Attribute;
  onChange: (id: string, value: string, unitId: string) => void;
  onLock: (attribute: Attribute, isLocked: boolean) => void;
  onClose: (id: string) => void;
}

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
  const unit = isAttribute ? attribute.selectedUnitId ?? attribute.units?.[0]?.id : attribute.units?.[0]?.id;
  const attributeIsLocking = attribute === lockingAttribute && isGloballyLocking;

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
              <VisuallyHidden>{isLocked ? "Unlock parameter" : "Lock parameter"}</VisuallyHidden>
              {attributeIsLocking ? (
                <ParameterLockSpinner>
                  <Spinner variant="small" />
                </ParameterLockSpinner>
              ) : isLocked ? (
                <LockClosedParameterComponent fill={headerColor} />
              ) : (
                <LockOpenComponent />
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
      <ParameterInputsWrapper>
        <input
          name="parameterInput"
          disabled={isLocked || !isAttribute}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={() => onChange(attribute.id, value, unit)}
        />

        <CompDropdown
          label="combinationDropdown"
          items={attribute?.units ?? []}
          disabled={isLocked}
          keyProp="id"
          valueProp="value"
          onChange={(_unit: EnumBase) => onChange(attribute.id, value, _unit.id)}
          borderRadius={2}
          borderColor={Color.BATTLESHIP_GREY}
          fontSize={FontSize.SMALL}
          height={22}
          listTop={27}
          defaultValue={unit}
        />
      </ParameterInputsWrapper>
    </Entity>
  );
};
