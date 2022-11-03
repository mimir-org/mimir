import { AttributeDescriptorComponent } from "./AttributeDescriptorComponent";
import { AttributeHeaderBox, AttributeObjectBody, AttributeObjectBox } from "./AttributeObject.styled";
import { Attribute } from "@mimirorg/modelbuilder-types";
import { AttributeObjectNameComponent } from "./AttributeObjectNameComponent";
import { AttributeButtonsComponent } from "./AttributeButtonsComponent";
import { QuantityDatumCm } from "@mimirorg/typelibrary-types";

export const PARAMETER_ENTITY_WIDTH = 255;

interface Props {
  attribute: Attribute;
  headerColor: string;
  bodyColor: string;
  isGloballyLocking: boolean;
  lockingAttribute: Attribute;
  quantityDatums: QuantityDatumCm[];
  onChange: (attributeId: string, property: string, value: string) => void;
  onLock: (attribute: Attribute, isLocked: boolean) => void;
  onClose: (id: string) => void;
}

/**
 * Component for a single Attribute used in the Inspector.
 * @param interface
 * @returns an attribute with quantity datums, value and unit.
 */
export const AttributeObject = ({
  attribute,
  headerColor,
  bodyColor,
  isGloballyLocking,
  lockingAttribute,
  quantityDatums,
  onLock,
  onClose,
  onChange,
}: Props) => {
  const attributeIsLocking = attribute === lockingAttribute && isGloballyLocking;
  const hasTypeReference = attribute?.attributeTypeIri != null && attribute?.attributeTypeIri.length > 0;

  return (
    <>
      {attribute && (
        <AttributeObjectBox disabled={attribute.isLocked ?? false}>
          <AttributeHeaderBox color={bodyColor}>
            <AttributeObjectNameComponent attribute={attribute} hasTypeReference={hasTypeReference} />
            <AttributeButtonsComponent
              attribute={attribute}
              headerColor={headerColor}
              attributeIsLocking={attributeIsLocking}
              onClose={(id: string) => onClose(id)}
              onLock={(attribute: Attribute, isLocked: boolean) => onLock(attribute, isLocked)}
            />
          </AttributeHeaderBox>
          <AttributeObjectBody>
            <AttributeDescriptorComponent
              headerColor={headerColor}
              attribute={attribute}
              quantityDatums={quantityDatums}
              onChange={(attributeId: string, property: string, value: string) => onChange(attributeId, property, value)}
            />
          </AttributeObjectBody>
        </AttributeObjectBox>
      )}
    </>
  );
};
