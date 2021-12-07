import { TextResources } from "../../../../assets/text";
import { ParameterDescriptorsWrapper } from "./styled/parameter";

interface Props {
  qualifier: string;
  source: string;
  condition: string;
}
function ParameterDescriptor({ qualifier, source, condition }: Props) {
  return (
    <ParameterDescriptorsWrapper>
      <div className="descriptors-top">
        <div>{TextResources.Inspector_Qualifier}</div>
        <div>{TextResources.Inspector_Source}</div>
        <div>{TextResources.Inspector_Condition}</div>
      </div>
      <div className="descriptors-bottom">
        <div>{qualifier}</div>
        <div>{source}</div>
        <div>{condition}</div>
      </div>
    </ParameterDescriptorsWrapper>
  );
}

export default ParameterDescriptor;
