import { Color, FontSize } from "../../../../compLibrary";
import { ParameterDescriptor } from "./";
import { ParameterBox, ParameterHeader } from "./styled/parameter";
import { Dropdown as CompDropdown } from "../../../../compLibrary/dropdown/mimir";
import { Attribute, CombinedAttribute } from "../../../../models";
import { useState } from "react";
import { Entity } from "./styled";
import {
  WarningIcon,
  HelpIcon,
  LockOpenIconComponent,
  CloseParameterIcon,
  LockClosedParameterIconComponent,
} from "../../../../assets/icons/common";

interface Props {
  attribute: Attribute;
  combination: CombinedAttribute;
  isNodeLocked: boolean;
  headerColor: string;
  bodyColor: string;
  onChange: (id: string, value: string, unit: string, nodeId: string) => void;
  onLock: (attribute: Attribute, isLocked: boolean) => void;
  onClose: (id: string) => void;
}

function Parameter({ attribute, combination, isNodeLocked, headerColor, bodyColor, onLock, onClose, onChange }: Props) {
  const [value, setValue] = useState(attribute.value ?? "");
  const [unit, setUnit] = useState(attribute.unit ?? attribute.units[0]);

  const isDisabled = () => isNodeLocked || attribute.isLocked;

  return (
    <Entity width={255}>
      <ParameterBox>
        <ParameterHeader color={bodyColor} isNodeLocked={isNodeLocked}>
          {false && ( //TODO: Add proper logic for warningIcon when validation feature is added
            <img src={WarningIcon} className="warningIcon" alt="icon" />
          )}

          <div className="parameterHeader">{attribute.key}</div>
          <div className="icons">
            <img src={HelpIcon} className="parameterIcon" alt="icon" onClick={() => null} />

            {isDisabled() ? (
              <LockClosedParameterIconComponent
                className="parameterIcon lockIcon"
                fill={headerColor}
                onClick={() => onLock(attribute, !attribute.isLocked)}
              />
            ) : (
              <LockOpenIconComponent
                className="parameterIcon lockIcon"
                onClick={() => onLock(attribute, !attribute.isLocked)}
              />
            )}

            <img src={CloseParameterIcon} className="parameterIcon" alt="icon" onClick={() => onClose(attribute.id)} />
          </div>
        </ParameterHeader>
        <ParameterDescriptor
          qualifier={combination.qualifier}
          source={combination.source}
          condition={combination.condition}
        />
        <div className="inputContainer">
          <input
            name="parameterInput"
            className="parameterInput"
            disabled={isDisabled()}
            value={value}
            type="text"
            onChange={(e) => setValue(e.target.value)}
            onBlur={() => onChange(attribute.id, value, unit?.id, attribute.nodeId)}
          />
          <div className="parameterDropdown">
            <CompDropdown
              label="hello"
              items={attribute.units}
              disabled={isDisabled()}
              keyProp="id"
              valueProp="value"
              onChange={(_unit) => {
                setUnit(_unit);
                onChange(attribute.id, value, unit.id, attribute.nodeId);
              }}
              borderRadius={2}
              borderColor={Color.InspectorGreyBorder}
              fontSize={FontSize.Small}
              height={22}
            />
          </div>
        </div>
      </ParameterBox>
    </Entity>
  );
}

export default Parameter;
