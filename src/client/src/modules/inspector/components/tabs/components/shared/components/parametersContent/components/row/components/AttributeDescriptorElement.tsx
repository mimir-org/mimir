import { AttributeDescriptorBody, AttributeDescriptorHeader, AttributeDescriptorText } from "./AttributeDescriptor.styled";

interface Props {
  headerText: string;
  text: string;
  color: string;
  isEven?: boolean;
}

/**
 * Component for one element of an Attribute descriptor.
 * @param interface
 * @returns a box with header text and text.
 */
export const AttributeDescriptorElement = ({ headerText, text, color, isEven }: Props) => (
  <AttributeDescriptorBody isEven={isEven}>
    <AttributeDescriptorHeader headerColor={color}>{headerText}</AttributeDescriptorHeader>
    <AttributeDescriptorText headerColor={color}>{text + "test"}</AttributeDescriptorText>
  </AttributeDescriptorBody>
);
