import { useEffect, useState } from "react";
import { ParameterDescriptor } from "./ParameterDescriptor";
import { Entity } from "../styled/Entity";
import { Color } from "../../../../../../../../../../../compLibrary/colors";
import { ParameterButton } from "../../../styled/ParameterButton";
import { ParameterHeader, ParameterInputsWrapper } from "./Parameter.styled";
import { Dropdown as CompDropdown } from "../../../../../../../../../../../compLibrary/dropdown/mimir";
import { Attribute, CombinedAttribute, EnumBase } from "../../../../../../../../../../../models";
import { HelpIcon, WarningIcon } from "../../../../../../../../../../../assets/icons/common";
import { LockClosedParameterComponent, LockOpenComponent } from "../../../../../../../../../../../assets/icons/lock";
import { CloseIcon } from "../../../../../../../../../../../assets/icons/close";
import { AttributeLikeItem } from "../../../../../../../../../types";
import { IsAttribute } from "../../../../../../../../../helpers/IsType";
import { FontSize } from "../../../../../../../../../../../compLibrary/font";
import { VisuallyHidden } from "../../../../../../../../../../../compLibrary/util";

export const PARAMETER_ENTITY_WIDTH = 255;

interface Props {
  attribute: AttributeLikeItem;
  combination: CombinedAttribute;
  headerColor: string;
  bodyColor: string;
  onChange: (id: string, value: string, unitId: string) => void;
  onLock: (attribute: Attribute, isLocked: boolean) => void;
  onClose: (id: string) => void;
}

export const Parameter = ({ attribute, combination, headerColor, bodyColor, onLock, onClose, onChange }: Props) => {
  const isAttribute = IsAttribute(attribute);
  const isLocked = isAttribute ? attribute.isLocked : false;
  const [value, setValue] = useState(isAttribute ? attribute.value ?? "" : "");
  const unit = isAttribute ? attribute.selectedUnitId ?? attribute.units?.[0]?.id : attribute.units?.[0]?.id;

  useEffect(() => {
    if (IsAttribute(attribute) && attribute.value) setValue(attribute.value);
  }, [attribute]);

  return (
    <Entity width={PARAMETER_ENTITY_WIDTH}>
      <ParameterHeader color={bodyColor}>
        {false && ( //TODO: Add proper logic for warningIcon when validation feature is added
          <img src={WarningIcon} className="warningIcon" alt="icon" />
        )}
        <span>{attribute?.entity}</span>
        {false && (
          <ParameterButton>
            <VisuallyHidden>Open help</VisuallyHidden>
            <img src={HelpIcon} alt="question mark" onClick={() => null} />
          </ParameterButton>
        )}
        {isAttribute && (
          <>
            <ParameterButton onClick={() => isAttribute && onLock(attribute, !attribute.isLocked)}>
              <VisuallyHidden>{isLocked ? "Unlock parameter" : "Lock parameter"}</VisuallyHidden>
              {isLocked ? <LockClosedParameterComponent fill={headerColor} /> : <LockOpenComponent />}
            </ParameterButton>
            <ParameterButton onClick={() => onClose(attribute.id)}>
              <VisuallyHidden>Close parameter</VisuallyHidden>
              <img src={CloseIcon} alt="x mark" />
            </ParameterButton>
          </>
        )}
      </ParameterHeader>
      <ParameterDescriptor qualifier={combination.qualifier} source={combination.source} condition={combination.condition} />
      <ParameterInputsWrapper>
        <input
          name="parameterInput"
          className="parameterInput"
          disabled={isLocked}
          value={value}
          type="text"
          onChange={(e) => isAttribute && setValue(e.target.value)}
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
          borderColor={Color.InspectorGreyBorder}
          fontSize={FontSize.Small}
          height={22}
          listTop={27}
          defaultValue={unit}
        />
      </ParameterInputsWrapper>
    </Entity>
  );
};
