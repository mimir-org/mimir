import { TabColumn } from "./styled/TabColumn";
import { Input } from "../../../../../../../compLibrary/input/text";
import { Edge } from "@mimirorg/modelbuilder-types";
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
        <Input readOnly value={edge.id ?? ""} onChange={() => null} inputType="" />
      </div>
      <div>
        <div>{TextResources.EDGEADMIN_RELATION}</div>
        <Input readOnly value={GetRelationName(edge.fromConnector?.relationType)} onChange={() => null} inputType="" />
      </div>
      <div>
        <div>{TextResources.EDGEADMIN_TEMPLATE}</div>
        <Input readOnly onChange={() => null} inputType="" />
      </div>
    </TabColumn>
    <TabColumn>
      <div>
        <div>{TextResources.EDGEADMIN_SOURCE}</div>
        <Input
          readOnly
          value={(edge.fromNode.label ?? edge.fromNode.name) + " - " + edge.fromNodeId}
          onChange={() => null}
          inputType=""
        />
      </div>
      <div>
        <div>{TextResources.EDGEADMIN_TARGET}</div>
        <Input
          readOnly
          value={(edge.toNode.label ?? edge.toNode.name) + " - " + edge.toNodeId}
          onChange={() => null}
          inputType=""
        />
      </div>
      <div>
        <div>{TextResources.EDGEADMIN_PROJECT}</div>
        <Input readOnly value={edge.masterProjectId} onChange={() => null} inputType="" />
      </div>
    </TabColumn>
  </>
);
