/* eslint-disable @typescript-eslint/no-unused-vars */
import { TextResources } from "../../../../../../../../../../../assets/text/TextResources";
import { AttributeDescriptorBox, AttributeDescriptorColumn, AttributeDescriptorRow } from "./AttributeDescriptor.styled";
import { AttributeDescriptorElement } from "./AttributeDescriptorElement";

interface Props {
  specifiedScope: string;
  specifiedProvenance: string;
  rangeSpecifying: string;
  regularitySpecified: string;
  headerColor: string;
  bodyColor: string;
  descriptorsAmount: number;
  singleColumn: boolean;
}

export const AttributeDescriptor = ({
  specifiedScope,
  specifiedProvenance,
  rangeSpecifying,
  regularitySpecified,
  headerColor,
  bodyColor,
  descriptorsAmount,
  singleColumn,
}: Props) => {
  if (singleColumn) {
    return (
      <AttributeDescriptorBox>
        <AttributeDescriptorColumn>
          {[...Array(descriptorsAmount)].map(() => {
            return (
              <AttributeDescriptorElement headerText={TextResources.SPECIFIED_SCOPE} text={specifiedScope} color={headerColor} />
            );
          })}
        </AttributeDescriptorColumn>
      </AttributeDescriptorBox>
    );
  }

  return (
    <AttributeDescriptorBox>
      <AttributeDescriptorRow>
        <AttributeDescriptorElement headerText={TextResources.SPECIFIED_SCOPE} text={specifiedScope} color={headerColor} isEven />
        <AttributeDescriptorElement headerText={TextResources.SPECIFIED_SCOPE} text={specifiedScope} color={headerColor} />
      </AttributeDescriptorRow>
      <AttributeDescriptorRow>
        <AttributeDescriptorElement headerText={TextResources.SPECIFIED_SCOPE} text={specifiedScope} color={headerColor} isEven />
        {descriptorsAmount === 4 && (
          <AttributeDescriptorElement
            headerText={TextResources.SPECIFIED_SCOPE}
            text={specifiedScope}
            color={headerColor}
            isEven
          />
        )}
      </AttributeDescriptorRow>

      {/* {[...Array(descriptorsAmount - 3)].map((_, index) => {
        return index % 2 === 0 ? (
          <AttributeDescriptorElement
            headerText={TextResources.SPECIFIED_SCOPE}
            text={specifiedScope}
            color={headerColor}
            isEven
          />
        ) : (
          <AttributeDescriptorElement headerText={TextResources.SPECIFIED_SCOPE} text={specifiedScope} color={headerColor} />
        );
      })} */}
    </AttributeDescriptorBox>
  );
};
