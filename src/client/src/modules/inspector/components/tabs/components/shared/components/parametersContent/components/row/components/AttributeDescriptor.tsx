import { TextResources } from "../../../../../../../../../../../assets/text/TextResources";
import { AttributeDescriptorsWrapper } from "./AttributeDescriptor.styled";

interface Props {
  specifiedScope: string;
  specifiedProvenance: string;
  rangeSpecifying: string;
  regularitySpecified: string;
  headerColor: string;
  bodyColor: string;
}

export const AttributeDescriptor = ({
  specifiedScope,
  specifiedProvenance,
  rangeSpecifying,
  regularitySpecified,
  headerColor,
  bodyColor,
}: Props) => (
  <AttributeDescriptorsWrapper bodyColor={bodyColor} headerColor={headerColor}>
    <div className="tjof">
      <div className="descriptors-top">
        <div className="gabbi">{TextResources.SPECIFIED_SCOPE}</div>
        <div className="gabbi">{TextResources.SPECIFIED_PROVENANCE}</div>
      </div>
      <div className="descriptors-bottom">
        <div className="gabbi-bottom">{specifiedScope + " test "}</div>
        <div className="gabbi-bottom">{specifiedProvenance + " test"}</div>
      </div>
    </div>
    <div className="tjof">
      <div className="descriptors-top">
        <div className="gabbi">{TextResources.RANGE_SPECIFYING}</div>
        <div className="gabbi">{TextResources.REGULARITY_SPECIFIED}</div>
      </div>
      <div className="descriptors-bottom">
        <div className="gabbi-bottom">{rangeSpecifying + " test"}</div>
        <div className="gabbi-bottom">{regularitySpecified + " test"}</div>
      </div>
    </div>
  </AttributeDescriptorsWrapper>
);
