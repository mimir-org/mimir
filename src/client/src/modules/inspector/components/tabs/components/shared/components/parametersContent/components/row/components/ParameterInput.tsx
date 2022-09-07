import { Dropdown, DropdownItem } from "../../../../../../../../../../../compLibrary/dropdown/mimir/Dropdown";
import { FontSize } from "../../../../../../../../../../../assets/font";
import { Color } from "../../../../../../../../../../../assets/color/Color";
import { Attribute, Unit } from "@mimirorg/modelbuilder-types";
import { IsAttribute } from "../../../../../../../../../helpers/IsType";
import { ParameterInputBox } from "./ParameterInput.styled";

interface Props {
  attribute: Attribute;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  onChange: (id: string, value: string, unitId: string) => void;
}

/**
 * Component for the input of a single parameter.
 * @param params
 * @returns an input field for adding a value, and a drop-down list for units.
 */
export const ParameterInput = ({ attribute, value, setValue, onChange }: Props) => {
  const isAttribute = IsAttribute(attribute);
  const isLocked = isAttribute ? attribute.isLocked : false;
  const unit = attribute.selectedUnitId ?? attribute.units?.[0]?.id; // TODO: check this line
  const units = [] as DropdownItem[];

  attribute?.units.forEach((u) => {
    units.push({ name: u.symbol, key: u.id });
  });

  return (
    <ParameterInputBox>
      <input
        name="parameterInput"
        disabled={isLocked || !isAttribute}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={() => onChange(attribute.id, value, unit)}
      />

      <Dropdown
        label="combinationDropdown"
        items={units}
        disabled={isLocked}
        keyProp="key"
        valueProp="value"
        onChange={(_unit: Unit) => onChange(attribute.id, value, _unit.id)}
        borderRadius={2}
        borderColor={Color.BATTLESHIP_GREY}
        fontSize={FontSize.SMALL}
        height={22}
        listTop={27}
        defaultValue={unit}
      />
    </ParameterInputBox>
  );
};
