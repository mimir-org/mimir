import { TabColumn } from "./styled/TabColumn";
import { Input } from "../../../../../../../compLibrary/input/text";
import { Edge } from "../../../../../../../models";
import { GetRelationName } from "../../shared/helpers/GetRelationName";
import { TextResources } from "../../../../../../../assets/text/TextResources";

interface Props {
  edge: Edge;
}

export const RelationEdgeAdminContent = ({ edge }: Props) => (
  <>
    <TabColumn>
      <div>
        <div>{TextResources.ID}</div>
        <Input readOnly={true} value={edge.id ?? ""} onChange={() => null} inputType="" />
      </div>
      <div>
        <div>{TextResources.INSPECTOR_EDGEADMIN_RELATION}</div>
        <Input readOnly={true} value={GetRelationName(edge.fromConnector?.relationType)} onChange={() => null} inputType="" />
      </div>
      <div>
        <div>{TextResources.INSPECTOR_EDGEADMIN_TEMPLATE}</div>
        <Input readOnly={true} onChange={() => null} inputType="" />
      </div>
    </TabColumn>
    <TabColumn>
      <div>
        <div>{TextResources.INSPECTOR_EDGEADMIN_SOURCE}</div>
        <Input
          readOnly={true}
          value={(edge.fromNode.label ?? edge.fromNode.name) + " - " + edge.fromNodeId}
          onChange={() => null}
          inputType=""
        />
      </div>
      <div>
        <div>{TextResources.INSPECTOR_EDGEADMIN_TARGET}</div>
        <Input
          readOnly={true}
          value={(edge.toNode.label ?? edge.toNode.name) + " - " + edge.toNodeId}
          onChange={() => null}
          inputType=""
        />
      </div>
      <div>
        <div>{TextResources.INSPECTOR_EDGEADMIN_PROJECT}</div>
        <Input readOnly={true} value={edge.masterProjectId} onChange={() => null} inputType="" />
      </div>
    </TabColumn>
  </>
);
