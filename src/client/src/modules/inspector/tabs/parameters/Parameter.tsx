import { useState } from "react";
import { ParameterDescriptor } from "./";
import { Entity } from "./styled";
import { Color } from "../../../../compLibrary/colors";
import { ParameterBox, ParameterHeader } from "./styled/parameter";
import { Dropdown as CompDropdown } from "../../../../compLibrary/dropdown/mimir";
import { Attribute, CombinedAttribute, EnumBase } from "../../../../models";
import { WarningIcon, HelpIcon } from "../../../../assets/icons/common";
import { LockClosedParameterComponent, LockOpenComponent } from "../../../../assets/icons/lock";
import { CloseIcon } from "../../../../assets/icons/close";
import { AttributeLikeItem } from "../../types";
import { IsAttribute } from "../../helpers/IsType";
import { FontSize } from "../../../../compLibrary/font";

export const PARAMETER_ENTITY_WIDTH: number = 255;

interface Props {
  attribute: AttributeLikeItem;
  combination: CombinedAttribute;
  isNodeLocked: boolean;
  headerColor: string;
  bodyColor: string;
  onChange: (id: string, value: string, unit: EnumBase) => void;
  onLock: (attribute: Attribute, isLocked: boolean) => void;
  onClose: (id: string) => void;
}

function Parameter({ attribute, combination, isNodeLocked, headerColor, bodyColor, onLock, onClose, onChange }: Props) {
  const isAttribute = IsAttribute(attribute);
  const [value, setValue] = useState(isAttribute ? attribute.value ?? "" : "");
  const [unit, setUnit] = useState<EnumBase>(
    isAttribute
      ? attribute.units?.find((_unit) => _unit.id === attribute.selectedUnitId) || attribute.units?.[0]
      : attribute?.units?.[0]
  );

  const isDisabled = () => (isAttribute ? attribute.isLocked : false);
  return (
    <Entity width={PARAMETER_ENTITY_WIDTH}>
      <ParameterBox>
        <ParameterHeader color={bodyColor}>
          {false && ( //TODO: Add proper logic for warningIcon when validation feature is added
            <img src={WarningIcon} className="warningIcon" alt="icon" />
          )}

          <div className="parameterHeader">{attribute?.entity}</div>
          <div className="icons">
            {false && <img src={HelpIcon} className="parameterIcon" alt="icon" onClick={() => null} />}
            {isAttribute && (
              <>
                {isDisabled() ? (
                  <LockClosedParameterComponent
                    className="parameterIcon"
                    fill={headerColor}
                    onClick={() => isAttribute && onLock(attribute, !attribute.isLocked)}
                  />
                ) : (
                  <LockOpenComponent
                    className="parameterIcon"
                    onClick={() => isAttribute && onLock(attribute, !attribute.isLocked)}
                  />
                )}

                <img src={CloseIcon} className="parameterIcon" alt="icon" onClick={() => onClose(attribute.id)} />
              </>
            )}
          </div>
        </ParameterHeader>
        <ParameterDescriptor qualifier={combination.qualifier} source={combination.source} condition={combination.condition} />
        <div className="inputContainer">
          <input
            name="parameterInput"
            className="parameterInput"
            disabled={isDisabled()}
            value={value}
            type="text"
            onChange={(e) => isAttribute && setValue(e.target.value)}
            onBlur={() => onChange(attribute.id, value, unit)}
          />
          <div className="parameterDropdown">
            <CompDropdown
              label="combinationDropdown"
              items={attribute?.units ?? []}
              disabled={isDisabled()}
              keyProp="id"
              valueProp="value"
              onChange={(_unit) => {
                isAttribute && setUnit(_unit);
                onChange(attribute.id, value, _unit);
              }}
              borderRadius={2}
              borderColor={Color.InspectorGreyBorder}
              fontSize={FontSize.Small}
              height={22}
              listTop={27}
              defaultValue={unit?.id}
            />
          </div>
        </div>
      </ParameterBox>
    </Entity>
  );
}

export default Parameter;
