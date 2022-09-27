import { TextResources } from "../../../../../../../../../../../assets/text/TextResources";
import { AttributesDescriptorsWrapper } from "./AttributeDescriptor.styled";

interface Props {
  specifiedScope: string;
  specifiedProvenance: string;
  rangeSpecifying: string;
  regularitySpecified: string;
}

export const AttributesDescriptor = ({ specifiedScope, specifiedProvenance, rangeSpecifying, regularitySpecified }: Props) => (
  <AttributesDescriptorsWrapper>
    <div className="descriptors-top">
      <div>{TextResources.SPECIFIED_SCOPE}</div>
      <div>{TextResources.SPECIFIED_PROVENANCE}</div>
      <div>{TextResources.RANGE_SPECIFYING}</div>
      <div>{TextResources.REGULARITY_SPECIFIED}</div>
    </div>
    <div className="descriptors-bottom">
      <div>{specifiedScope}</div>
      <div>{specifiedProvenance}</div>
      <div>{rangeSpecifying}</div>
      <div>{regularitySpecified}</div>
    </div>
  </AttributesDescriptorsWrapper>
);
