import { TextResources } from "../../../../assets/text";

interface Props {
  qualifier: string;
  source: string;
  condition: string;
}
function ParameterDescriptor({ qualifier, source, condition }: Props) {
  return (
    <div className="descriptors">
      <div className="descriptors-top">
        <div>{TextResources.Inspector_Qualifier}</div>
        <div>{TextResources.Inspector_Source}</div>
        <div>{TextResources.Inspector_Condition}</div>
      </div>
      <hr />
      <div className="descriptors-bottom">
        <div>{qualifier}</div>
        <div>{source}</div>
        <div>{condition}</div>
      </div>
    </div>
  );
}

export default ParameterDescriptor;
