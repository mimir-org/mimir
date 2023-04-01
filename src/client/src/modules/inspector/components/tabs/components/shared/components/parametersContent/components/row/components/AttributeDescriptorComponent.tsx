import { QuantityDatumCm, QuantityDatumType } from "@mimirorg/typelibrary-types";
import { TextResources } from "../../../../../../../../../../../assets/text/TextResources";
import { AttributeDescriptorBox, AttributeDescriptorRow } from "./AttributeDescriptor.styled";
import { AttributeQuantityDatumElement } from "./AttributeQuantityDatumElement";
import { AttributeInputElement } from "./AttributeInputElement";
import { AttributeUnitElement } from "./AttributeUnitElement";
import { nameof } from "../../../../../../../../../../../helpers/ObjectFunctions";
import { Attribute } from "lib";

interface Props {
  headerColor: string;
  attribute: Attribute;
  quantityDatums: QuantityDatumCm[];
  onChange: (attributeId: string, property: string, value: string) => void;
}

/**
 * Component to display the Attribute quantity datums, value and unit in the Inspector.
 * @param interface
 * @returns existing quantity datums, value and unit for a single Attribute.
 */
export const AttributeDescriptorComponent = ({ headerColor, attribute, quantityDatums, onChange }: Props) => {
  return (
    <>
      {attribute && (
        <AttributeDescriptorBox>
          <AttributeDescriptorRow>
            {/* <AttributeQuantityDatumElement
              attributeId={attribute.id}
              property={nameof<Attribute>("specifiedScope")}
              headerText={TextResources.SPECIFIED_SCOPE}
              value={attribute.specifiedScope}
              color={headerColor}
              values={quantityDatums.filter((x) => x.quantityDatumType === QuantityDatumType.QuantityDatumSpecifiedScope)}
              isLocked={attribute.isLocked}
              onChange={(attributeId: string, property: string, value: string) => onChange(attributeId, property, value)}
            />
            <AttributeQuantityDatumElement
              attributeId={attribute.id}
              property={nameof<Attribute>("specifiedProvenance")}
              headerText={TextResources.SPECIFIED_PROVENANCE}
              value={attribute.specifiedProvenance}
              color={headerColor}
              values={quantityDatums.filter((x) => x.quantityDatumType === QuantityDatumType.QuantityDatumSpecifiedProvenance)}
              isLocked={attribute.isLocked}
              onChange={(attributeId: string, property: string, value: string) => onChange(attributeId, property, value)}
            /> */}
            <AttributeInputElement
              attributeId={attribute.id}
              property={nameof<Attribute>("value")}
              value={attribute.value}
              isLocked={attribute.isLocked}
              onChange={(attributeId: string, property: string, value: string) => onChange(attributeId, property, value)}
            />
          </AttributeDescriptorRow>
          <AttributeDescriptorRow>
            {/* <AttributeQuantityDatumElement
              attributeId={attribute.id}
              property={nameof<Attribute>("rangeSpecifying")}
              headerText={TextResources.RANGE_SPECIFYING}
              value={attribute.rangeSpecifying}
              color={headerColor}
              values={quantityDatums.filter((x) => x.quantityDatumType === QuantityDatumType.QuantityDatumRangeSpecifying)}
              isLocked={attribute.isLocked}
              onChange={(attributeId: string, property: string, value: string) => onChange(attributeId, property, value)}
            />
            <AttributeQuantityDatumElement
              attributeId={attribute.id}
              property={nameof<Attribute>("regularitySpecified")}
              headerText={TextResources.REGULARITY_SPECIFIED}
              value={attribute.regularitySpecified}
              color={headerColor}
              values={quantityDatums.filter((x) => x.quantityDatumType === QuantityDatumType.QuantityDatumRegularitySpecified)}
              isLocked={attribute.isLocked}
              onChange={(attributeId: string, property: string, value: string) => onChange(attributeId, property, value)}
            />
            <AttributeUnitElement
              attributeId={attribute.id}
              property={nameof<Attribute>("selectedUnitId")}
              value={attribute.selectedUnitId}
              values={attribute.units}
              isLocked={attribute.isLocked}
              onChange={(attributeId: string, property: string, value: string) => onChange(attributeId, property, value)}
            /> */}
          </AttributeDescriptorRow>
        </AttributeDescriptorBox>
      )}
    </>
  );
};
