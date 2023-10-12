import { QuantityDatumLibCm } from "@mimirorg/typelibrary-types";
import { FontSize } from "../../../../../../../../../../../assets/font";
import { Dropdown } from "compLibrary/dropdown/Dropdown";
import { AttributeDescriptorBody, AttributeDescriptorHeader, AttributeDescriptorValue } from "./AttributeDescriptor.styled";

interface Props {
  attributeId: string;
  property: string;
  headerText: string;
  value: string;
  color: string;
  values: QuantityDatumLibCm[];
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
        fontSize={FontSize.TINY}
        height={22}
        valueProp="name"
        items={values}
        keyProp="name"
        defaultValue={value}
        disabled={isLocked}
        onChange={(item: QuantityDatumLibCm) => onChange(attributeId, property, item.name !== "None" ? item.name : null)}
      />
    </AttributeDescriptorValue>
  </AttributeDescriptorBody>
);
