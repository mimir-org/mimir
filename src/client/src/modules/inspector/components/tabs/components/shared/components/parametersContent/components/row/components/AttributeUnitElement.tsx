import { Unit } from "lib";
import { FontSize } from "../../../../../../../../../../../assets/font";
import { Dropdown } from "compLibrary/dropdown/Dropdown";
import { AttributeDescriptorBody, AttributeDescriptorValue } from "./AttributeDescriptor.styled";
import { AttributeUnitBox } from "./AttributeInput.styled";

interface Props {
  attributeId: string;
  property: string;
  value: string;
  values: Unit[];
  isLocked: boolean;
  onChange: (attributeId: string, property: string, value: string) => void;
}

/**
 * Component for selecting unit for property.
 * @param interface
 * @returns a dropdown with units.
 */
export const AttributeUnitElement = ({ attributeId, property, value, values, isLocked, onChange }: Props) => (
  <AttributeDescriptorBody>
    <AttributeDescriptorValue headerColor={null}>
      <AttributeUnitBox>
        <Dropdown
          defaultValue={value}
          label="Unit"
          valueProp="symbol"
          items={values}
          fontSize={FontSize.TINY}
          height={22}
          keyProp="id"
          disabled={isLocked}
          onChange={(item: Unit) => onChange(attributeId, property, item.id)}
        />
      </AttributeUnitBox>
    </AttributeDescriptorValue>
  </AttributeDescriptorBody>
);
