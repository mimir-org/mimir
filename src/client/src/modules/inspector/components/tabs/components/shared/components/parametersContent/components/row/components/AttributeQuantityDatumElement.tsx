import { QuantityDatumCm } from "@mimirorg/typelibrary-types";
import { Dropdown } from "../../../../../../../../../../../compLibrary/dropdown/mimir/Dropdown";
import { AttributeDescriptorBody, AttributeDescriptorHeader, AttributeDescriptorValue } from "./AttributeDescriptor.styled";

interface Props {
  attributeId: string;
  property: string;
  headerText: string;
  value: string;
  color: string;
  values: QuantityDatumCm[];
  isLocked: boolean;
  onChange: (attributeId: string, property: string, value: string) => void;
}

/**
 * Component for one element of an attribute quantity datum.
 * @param interface
 * @returns a box with header text and dropdown selector.
 */
export const AttributeQuantityDatumElement = ({
  attributeId,
  property,
  headerText,
  value,
  color,
  values,
  isLocked,
  onChange,
}: Props) => (
  <AttributeDescriptorBody>
    <AttributeDescriptorHeader headerColor={color}>{headerText}</AttributeDescriptorHeader>
    <AttributeDescriptorValue headerColor={color}>
      <Dropdown
        label={headerText}
        valueProp="name"
        items={values}
        keyProp="name"
        defaultValue={value}
        disabled={isLocked}
        onChange={(item: QuantityDatumCm) => onChange(attributeId, property, item.name !== "None" ? item.name : null)}
      />
    </AttributeDescriptorValue>
  </AttributeDescriptorBody>
);