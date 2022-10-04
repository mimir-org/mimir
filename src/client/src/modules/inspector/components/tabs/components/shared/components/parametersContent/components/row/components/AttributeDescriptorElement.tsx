import { AttributeDescriptorBody, AttributeDescriptorHeader, AttributeDescriptorValue } from "./AttributeDescriptor.styled";

interface Props {
  headerText: string;
  value: string;
  color: string;
}

/**
 * Component for one element of an Attribute descriptor.
 * @param interface
 * @returns a box with header text and text.
 */
export const AttributeDescriptorElement = ({ headerText, value, color }: Props) => (
  <AttributeDescriptorBody>
    <AttributeDescriptorHeader headerColor={color}>{headerText}</AttributeDescriptorHeader>
    <AttributeDescriptorValue headerColor={color}>{value}</AttributeDescriptorValue>
  </AttributeDescriptorBody>
);
