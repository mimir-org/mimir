import {
  WarningIcon,
  HelpIcon,
  LockOpenIcon,
  CloseIcon,
  LockClosedIcon,
} from "../../../../assets/icons/common";
import { FontSize } from "../../../../compLibrary";
import { GetParametersColor } from "./helpers";
import ParameterDescriptor from "./ParameterDescriptor";
import { ParameterBox, ParameterHeader } from "./styled/parameter";
import { Dropdown as CompDropdown } from "../../../../compLibrary/dropdown/mimir";
import { Attribute, CombinedAttribute } from "../../../../models";
import { useState } from "react";
import { Entity } from "./styled";

interface Props {
  attribute: Attribute;
  combination: CombinedAttribute;
  isNodeLocked: boolean;
  onChange: (id: string, value: string, unit: string, nodeId: string) => void;
  onLock: (attribute: Attribute, isLocked: boolean) => void;
  onClose: (id: string) => void;
}

function Parameter({
  attribute,
  combination,
  isNodeLocked,
  onLock,
  onClose,
  onChange,
}: Props) {
  const [value, setValue] = useState(attribute.value ?? "");
  const [unit, setUnit] = useState(attribute.unit ?? attribute.units[0]);

  const isDisabled = () => isNodeLocked || attribute.isLocked;

  return (
    <Entity width={255}>
      <ParameterBox>
        <ParameterHeader
          color={GetParametersColor()}
          isNodeLocked={isNodeLocked}
        >
          {false && ( //TODO: Add proper logic for warningIcon when validation feature is added
            <img src={WarningIcon} className="warningIcon" alt="icon" />
          )}

          <div className="parameterHeader">{attribute.key}</div>
          <div className="icons">
            <img
              src={HelpIcon}
              className="parameterIcon"
              alt="icon"
              onClick={() => null}
            />
            <img
              src={isDisabled() ? LockClosedIcon : LockOpenIcon}
              className="parameterIcon lockIcon"
              alt="icon"
              onClick={() => onLock(attribute, !attribute.isLocked)}
            />

            <img
              src={CloseIcon}
              className="parameterIcon"
              alt="icon"
              onClick={() => onClose(attribute.id)}
            />
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
            onBlur={() =>
              onChange(attribute.id, value, unit.id, attribute.nodeId)
            }
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
