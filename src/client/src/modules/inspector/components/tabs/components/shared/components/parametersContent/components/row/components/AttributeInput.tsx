import { Attribute } from "@mimirorg/modelbuilder-types";
import { IsAttribute } from "../../../../../../../../../helpers/IsType";
import { AttributeInputBox } from "./AttributeInput.styled";
import { AttributesDropdown } from "../../../../../../parameters/components/dropdown/AttributesDropdown";

interface Props {
  attribute: Attribute;
  value: string;
  singleColumn: boolean;
  hasDescriptors: boolean;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  onChange: (id: string, value: string, unitId: string) => void;
}

/**
 * Component for the input of a single Attribute.
 * @param props
 * @returns an input field for adding a value, and a drop-down list for units.
 */
export const AttributeInput = ({ attribute, value, singleColumn, hasDescriptors, setValue, onChange }: Props) => {
  if (!attribute) return null;

  const isAttribute = IsAttribute(attribute);
  const isLocked = isAttribute ? attribute.isLocked : false;
  const hasSelectedUnitId = attribute.selectedUnitId !== "" && attribute.selectedUnitId != undefined;
  const defaultValueForDropDown = hasSelectedUnitId ? attribute.selectedUnitId : attribute.units?.[0]?.id;

  return (
    <AttributeInputBox singleColumn={singleColumn} hasDescriptors={hasDescriptors}>
      <input
        name="attributeInput"
        disabled={isLocked || !isAttribute}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={() => onChange(attribute.id, value, null)}
        size={1}
      />

      <AttributesDropdown
        label="combinationDropdown"
        units={attribute.units}
        disabled={isLocked}
        onChange={(_unitId: string) => onChange(attribute.id, value, _unitId)}
        defaultUnitId={defaultValueForDropDown}
      />
    </AttributeInputBox>
  );
};
