import { Attribute, Unit } from "@mimirorg/modelbuilder-types";
import { IsAttribute } from "../../../../../../../../../helpers/IsType";
import { ParameterInputBox } from "./ParameterInput.styled";
import { ParametersDropdown } from "../../../../../../parameters/components/dropdown/ParametersDropdown";

interface Props {
  attribute: Attribute;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  onChange: (id: string, value: string, unit: Unit) => void;
}

/**
 * Component for the input of a single parameter.
 * @param params
 * @returns an input field for adding a value, and a drop-down list for units.
 */
export const ParameterInput = ({ attribute, value, setValue, onChange }: Props) => {
  const isAttribute = IsAttribute(attribute);
  const isLocked = isAttribute ? attribute.isLocked : false;
  const defaultValueForDropDown = attribute.units?.[0];

  return (
    <ParameterInputBox>
      <input
        name="parameterInput"
        disabled={isLocked || !isAttribute}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={() => onChange(attribute.id, value, null)}
      />

      <ParametersDropdown
        label="combinationDropdown"
        units={attribute.units}
        disabled={isLocked}
        onChange={(_unit: Unit) => onChange(attribute.id, value, _unit)}
        defaultValue={defaultValueForDropDown}
        isParameterDropdown
      />
    </ParameterInputBox>
  );
};
