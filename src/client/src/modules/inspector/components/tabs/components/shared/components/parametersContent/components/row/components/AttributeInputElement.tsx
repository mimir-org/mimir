import { useRef } from "react";
import { AttributeDescriptorBody, AttributeDescriptorValue } from "./AttributeDescriptor.styled";
import { AttributeInputBox } from "./AttributeInput.styled";

interface Props {
  attributeId: string;
  property: string;
  value: string;
  isLocked: boolean;
  onChange: (attributeId: string, property: string, value: string) => void;
}

/**
 * Component for input attribute value.
 * @param interface
 * @returns a box with text input.
 */
export const AttributeInputElement = ({ attributeId, property, value, isLocked, onChange }: Props) => {
  const ref = useRef(null);

  const handleBlur = () => {
    onChange(attributeId, property, ref.current.value);
  };

  return (
    <AttributeDescriptorBody>
      <AttributeDescriptorValue headerColor={null}>
        <AttributeInputBox>
          <input ref={ref} name="attributeInputValue" defaultValue={value} onBlur={handleBlur} size={1} disabled={isLocked} />
        </AttributeInputBox>
      </AttributeDescriptorValue>
    </AttributeDescriptorBody>
  );
};
