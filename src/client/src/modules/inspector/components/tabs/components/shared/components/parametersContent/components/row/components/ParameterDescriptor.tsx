import { TextResources } from "../../../../../../../../../../../assets/text/TextResources";
import { ParameterDescriptorsWrapper } from "./ParameterDescriptor.styled";

interface Props {
  qualifier: string;
  source: string;
  condition: string;
}

export const ParameterDescriptor = ({ qualifier, source, condition }: Props) => (
  <ParameterDescriptorsWrapper>
    <div className="descriptors-top">
      <div>{TextResources.INSPECTOR_QUALIFIER}</div>
      <div>{TextResources.INSPECTOR_SOURCE}</div>
      <div>{TextResources.INSPECTOR_CONDITION}</div>
    </div>
    <div className="descriptors-bottom">
      <div>{qualifier}</div>
      <div>{source}</div>
      <div>{condition}</div>
    </div>
  </ParameterDescriptorsWrapper>
);
