import moment from "moment/moment.js";
import { useDispatch } from "react-redux";
import { TextResources } from "../../../../assets/text";
import { TabColumn } from "../../styled";
import { Input, Textarea } from "../../../../compLibrary";
import { EnumBase, Node, Project } from "../../../../models";
import { GetRdsId, GetReferenceDesignation } from "../../../../assets/helpers";
import { IsLocation } from "../../../../components/flow/helpers/common";
import { IsBlockView } from "../../../../components/flow/helpers/block";
import { changeNodeValue } from "../../../../redux/store/project/actions";
import { Dropdown } from "../../../../compLibrary/dropdown/mimir";

interface Props {
  node: Node;
  project: Project;
  statuses: EnumBase[];
}

const AdminContent = ({ node, project, statuses }: Props) => {
  const dispatch = useDispatch();

  const onChange = (e: any, key: string) => {
    dispatch(changeNodeValue(node.id, key, e.target.value));
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
          <Dropdown
            label=""
            items={statuses}
            keyProp={null}
            valueProp={null}
            onChange={(e: any) => onChange(e, "statusId")}
          ></Dropdown>
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
    </>
  );
};

export default AdminContent;
