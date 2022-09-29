import { Descriptor } from "../../../../../../../../../../../models/project";
import { AttributeDescriptorBox, AttributeDescriptorColumn, AttributeDescriptorRow } from "./AttributeDescriptor.styled";
import { AttributeDescriptorElement } from "./AttributeDescriptorElement";

interface Props {
  headerColor: string;
  singleColumn: boolean;
  descriptors: Descriptor[];
}

/**
 * Component to display the AttributesDescriptors in the Inspector.
 * The descriptors are displayed in one or two columns, based on the amount of descriptors.
 * If less than 3 descriptors exist, one column is used.
 * @param interface
 * @returns existing descriptors for a single Attribute.
 */
export const AttributeDescriptor = ({ headerColor, singleColumn, descriptors }: Props) => {
  // The return of 1 or 2 descriptors
  if (singleColumn) {
    return (
      <AttributeDescriptorBox>
        <AttributeDescriptorColumn>
          {descriptors.map((descriptor) => {
            return <AttributeDescriptorElement headerText={descriptor.header} value={descriptor.value} color={headerColor} />;
          })}
        </AttributeDescriptorColumn>
      </AttributeDescriptorBox>
    );
  }

  // The return of 3 or 4 descriptors
  return (
    <AttributeDescriptorBox>
      <AttributeDescriptorRow>
        <AttributeDescriptorElement headerText={descriptors[0].header} value={descriptors[0].value} color={headerColor} />
        <AttributeDescriptorElement headerText={descriptors[1].header} value={descriptors[1].value} color={headerColor} />
      </AttributeDescriptorRow>
      <AttributeDescriptorRow>
        <AttributeDescriptorElement headerText={descriptors[2].header} value={descriptors[2].value} color={headerColor} />
        {descriptors.length === 4 && (
          <AttributeDescriptorElement headerText={descriptors[3].header} value={descriptors[3].value} color={headerColor} />
        )}
      </AttributeDescriptorRow>
    </AttributeDescriptorBox>
  );
};
