import {
  WarningIcon,
  HelpIcon,
  LockOpenIcon,
  CloseIcon,
} from "../../../../assets/icons/common";
import { FontSize } from "../../../../compLibrary";
import { GetParametersColor } from "./helpers";
import ParameterDescriptor from "./ParameterDescriptor";
import { Entity } from "./styled";
import { ParameterBox, ParameterHeader } from "./styled/parameter";
import { Dropdown as CompDropdown } from "../../../../compLibrary/dropdown/mimir";
import { Attribute } from "../../../../models";
import { useState } from "react";

interface Props {
  attribute: Attribute;
  onChange: (id: string, value: string, unit: string, nodeId: string) => void;
  onLock: () => void;
  onClose: () => void;
}

function Parameter({ attribute, onLock, onClose, onChange }: Props) {
  const [value, setValue] = useState(attribute.value ?? "");
  const [unit, setUnit] = useState(attribute.unit ?? attribute.units[0]);

  return (
    <Entity width={255}>
      <ParameterBox>
        <ParameterHeader color={GetParametersColor()}>
          {false && (
            <img src={WarningIcon} className="warningIcon" alt="icon" />
          )}

          <div className="parameterHeader">Flowrate</div>
          <div className="icons">
            <img
              src={HelpIcon}
              className="parameterIcon"
              alt="icon"
              onClick={() => null}
            />
            <img
              src={LockOpenIcon}
              className="parameterIcon"
              alt="icon"
              onClick={onLock}
            />
            <img
              src={CloseIcon}
              className="parameterIcon"
              alt="icon"
              onClick={onClose}
            />
          </div>
        </ParameterHeader>
        <ParameterDescriptor />
        <div className="inputContainer">
          <input
            name="parameterInput"
            className="parameterInput"
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
