import moment from "moment/moment.js";
import { useDispatch } from "react-redux";
import { TextResources } from "../../../../assets/text";
import { Contractor } from "../../../../redux/store/common/types";
import { TabColumn } from "../../../../compLibrary/box/inspector";
import { Input, Select, Textarea } from "../../../../compLibrary";
import { EnumBase, Node, Project } from "../../../../models";
import { GetRdsId, GetReferenceDesignation } from "../../../../assets/helpers";
import { IsLocation } from "../../../flow/helpers/common";
import { IsBlockView } from "../../../flow/helpers/block";
import { DeleteNodeButton } from "../helpers";
import {
  changeNodeValue,
  removeEdge,
  removeNode,
} from "../../../../redux/store/project/actions";

interface Props {
  node: Node;
  project: Project;
  contractors: Contractor[];
  statuses: EnumBase[];
}

const AdminContent = ({ node, project, contractors, statuses }: Props) => {
  const dispatch = useDispatch();

  const onChange = (e: any, key: string) => {
    dispatch(changeNodeValue(node.id, key, e.target.value));
  };

  const onDelete = () => {
    project.edges.forEach((edge) => {
      if (edge.fromNodeId === node.id) dispatch(removeEdge(edge.id));
      if (edge.toNodeId === node.id) dispatch(removeEdge(edge.id));
    });
    dispatch(removeNode(node.id));
  };

  return (
    <>
      <TabColumn>
        <div>
          <div>{TextResources.Inspector_Admin_Id}</div>
          <Input
            readOnly={true}
            value={node.id ?? ""}
            onChange={() => null}
            inputType=""
          />
        </div>
        <div>
          <div>{TextResources.Inspector_Admin_RDS}</div>
          <Input
            readOnly={true}
            value={GetRdsId(node)}
            onChange={() => null}
            inputType=""
          />
        </div>
        <div>
          <div>{TextResources.Inspector_Admin_Semantic_Id}</div>
          <Input
            value={node.semanticReference ?? ""}
            onChange={(e: any) => onChange(e, "semanticId")}
            inputType=""
          />
        </div>
      </TabColumn>
      <TabColumn>
        <div>
          <div>{TextResources.Inspector_Admin_Designation}</div>
          <Input
            readOnly={true}
            value={GetReferenceDesignation(node, project)}
            onChange={() => null}
            inputType=""
          />
        </div>
        <div>
          <div>{TextResources.Inspector_Admin_Updated_By}</div>
          <Input
            readOnly={true}
            value={node.updatedBy}
            onChange={() => null}
            inputType=""
          />
        </div>
        <div>
          <div>{TextResources.Inspector_Admin_Updated_Date}</div>
          <Input
            readOnly={true}
            value={moment(node.updated).format("DD/MM/YYYY")}
            onChange={() => null}
            inputType=""
          />
        </div>
      </TabColumn>
      <TabColumn>
        <div>
          <div>{TextResources.Inspector_Admin_Service}</div>
          <Input
            value={node.label}
            onChange={(e: any) => onChange(e, "label")}
            inputType=""
          />
        </div>
        <div>
          <div>{TextResources.Inspector_Admin_Type}</div>
          <Input
            readOnly={true}
            value={node.name}
            onChange={() => null}
            inputType=""
          />
        </div>
        {IsLocation(node) && IsBlockView() && (
          <div>
            <div>{TextResources.Inspector_Admin_Width}</div>
            <Input
              value={node.width}
              onChange={(e: any) => onChange(e, "width")}
              inputType=""
            />
          </div>
        )}
        <div>
          <div>{TextResources.Inspector_Admin_Tag}</div>
          <Input
            value={node.tagNumber ?? ""}
            onChange={(e: any) => onChange(e, "tagNumber")}
            inputType=""
          />
        </div>
        {IsLocation(node) && IsBlockView() && (
          <div>
            <div>{TextResources.Inspector_Admin_Height}</div>
            <Input
              value={node.height}
              onChange={(e: any) => onChange(e, "height")}
              inputType=""
              readOnly={true}
            />
          </div>
        )}
      </TabColumn>
      <TabColumn>
        <div>
          <div>{TextResources.Inspector_Admin_Status}</div>
          <Select
            value={node.statusId ?? ""}
            onChange={(e: any) => onChange(e, "statusId")}
          >
            {statuses?.map((x) => (
              <option key={x.id} value={x.id}>
                {x.name}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <div>{TextResources.Inspector_Admin_Version}</div>
          <Input
            value={node.version ?? ""}
            onChange={(e: any) => onChange(e, "version")}
            inputType=""
          />
        </div>
        {IsLocation(node) && IsBlockView() && (
          <div>
            <div>{TextResources.Inspector_Admin_Length}</div>
            <Input
              value={node.length}
              onChange={(e: any) => onChange(e, "length")}
              inputType=""
            />
          </div>
        )}
        <div>
          <div>{TextResources.Inspector_Admin_Contractor}</div>
          <Select
            value={node.contractor ?? "NotSet"} // TODO: check this
            onChange={(e: any) => onChange(e, "contractor")}
          >
            <option value={"NotSet"}>{"NotSet"}</option>
            {contractors?.map((contractor) => (
              <option key={contractor.id} value={contractor.name}>
                {contractor.name}
              </option>
            ))}
          </Select>
        </div>
      </TabColumn>
      <TabColumn>
        <div>
          <div>{TextResources.Inspector_Admin_Description}</div>
          <Textarea
            width="300"
            height="90"
            value={node.description ?? ""}
            onChange={(e: any) => onChange(e, "description")}
          ></Textarea>
        </div>
      </TabColumn>
      <TabColumn>
        <DeleteNodeButton handleClick={onDelete} />
      </TabColumn>
    </>
  );
};

export default AdminContent;
