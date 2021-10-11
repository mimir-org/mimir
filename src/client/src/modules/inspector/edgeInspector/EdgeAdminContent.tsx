import { TabColumn } from "../styled";
import { Input } from "../../../compLibrary";
import { Edge } from "../../../models";
import { GetRelationName } from "./../helpers";
import { TextResources } from "../../../assets/text";

interface Props {
  edge: Edge;
}

const EdgeAdminContent = ({ edge }: Props) => (
  <>
    <TabColumn>
      <div>
        <div>{TextResources.Inspector_EdgeAdmin_Id}</div>
        <Input readOnly={true} value={edge.id ?? ""} onChange={() => null} inputType="" />
      </div>
      <div>
        <div>{TextResources.Inspector_EdgeAdmin_Relation}</div>
        <Input
          readOnly={true}
          value={GetRelationName(edge.fromConnector?.relationType)}
          onChange={() => null}
          inputType=""
        />
      </div>
      <div>
        <div>{TextResources.Inspector_EdgeAdmin_Template}</div>
        <Input readOnly={true} onChange={() => null} inputType="" />
      </div>
    </TabColumn>
    <TabColumn>
      <div>
        <div>{TextResources.Inspector_EdgeAdmin_Source}</div>
        <Input
          value={(edge.fromNode.label ?? edge.fromNode.name) + " - " + edge.fromNodeId}
          onChange={() => null}
          inputType=""
        />
      </div>
      <div>
        <div>{TextResources.Inspector_EdgeAdmin_Target}</div>
        <Input
          readOnly={true}
          value={(edge.toNode.label ?? edge.toNode.name) + " - " + edge.toNodeId}
          onChange={() => null}
          inputType=""
        />
      </div>
      <div>
        <div>{TextResources.Inspector_EdgeAdmin_Project}</div>
        <Input readOnly={true} value={edge.masterProjectId} onChange={() => null} inputType="" />
      </div>
    </TabColumn>
  </>
);
export default EdgeAdminContent;
