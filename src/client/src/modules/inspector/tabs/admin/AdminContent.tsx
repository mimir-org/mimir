import moment from "moment/moment.js";
import { useDispatch } from "react-redux";
import { TextResources } from "../../../../assets/text";
import { TabColumn } from "../../styled";
import { FontSize, Input, Textarea } from "../../../../compLibrary";
import { EnumBase, Node, Project } from "../../../../models";
import { GetRdsId, GetReferenceDesignation } from "../../../../assets/helpers";
import { IsLocation, IsProduct } from "../../../../components/flow/helpers";
import { IsBlockView } from "../../../../components/flow/block/helpers";
import { changeNodeValue } from "../../../../redux/store/project/actions";
import { Dropdown } from "../../../../compLibrary/dropdown/mimir";
import React from "react";

type Event = React.ChangeEvent<HTMLInputElement>;

interface Props {
  node: Node;
  project: Project;
  statuses: EnumBase[];
}

const AdminContent = ({ node, project, statuses }: Props) => {
  const dispatch = useDispatch();
  const onChange = (key: string, value: any) => dispatch(changeNodeValue(node.id, key, value));

  return (
    <>
      <TabColumn width={250}>
        <div>
          <div>{TextResources.Inspector_Admin_Id}</div>
          <Input fontSize={FontSize.Standard} readOnly={true} value={node.id ?? ""} onChange={() => null} inputType="" />
        </div>
        <div>
          <div>{TextResources.Inspector_Admin_RDS}</div>
          <Input
            fontSize={FontSize.Standard}
            readOnly={true}
            value={GetRdsId(node) ?? ""}
            onChange={() => null}
            inputType=""
          />
        </div>
        <div>
          <div>{TextResources.Inspector_Admin_Semantic_Id}</div>
          <Input
            fontSize={FontSize.Standard}
            readOnly={true}
            value={node.semanticReference ?? ""}
            onChange={() => null}
            inputType=""
          />
        </div>
      </TabColumn>
      <TabColumn width={250}>
        <div>
          <div>{TextResources.Inspector_Admin_Service}</div>
          <Input
            fontSize={FontSize.Standard}
            value={node.label ?? ""}
            onChange={(e: Event) => onChange("label", e.target.value)}
            inputType=""
          />
        </div>
        <div>
          <div>{TextResources.Inspector_Admin_Type}</div>
          <Input fontSize={FontSize.Standard} readOnly={true} value={node.name} onChange={() => null} inputType="" />
        </div>
        <div>
          <div>{TextResources.Inspector_Admin_Updated_By}</div>
          <Input
            fontSize={FontSize.Standard}
            readOnly={true}
            value={node.updatedBy ?? ""}
            onChange={() => null}
            inputType=""
          />
        </div>
      </TabColumn>
      <TabColumn width={125}>
        <div>
          <div>{TextResources.Inspector_Admin_Updated_Date}</div>
          <Input
            fontSize={FontSize.Standard}
            readOnly={true}
            value={moment(node.updated).format("DD/MM/YYYY") ?? ""}
            onChange={() => null}
            inputType=""
          />
        </div>
        <div>
          <div>{TextResources.Inspector_Admin_Created_Date}</div>
          <Input fontSize={FontSize.Standard} readOnly={true} onChange={() => null} inputType="" />
        </div>
        <div>
          <div>{TextResources.Inspector_Admin_Designation}</div>
          <Input
            fontSize={FontSize.Standard}
            readOnly={true}
            value={GetReferenceDesignation(node, project) ?? ""}
            onChange={() => null}
            inputType=""
          />
        </div>
        {IsLocation(node) && IsBlockView() && (
          <div>
            <div>{TextResources.Inspector_Admin_Width}</div>
            <Input
              fontSize={FontSize.Standard}
              value={node.width ?? ""}
              onChange={(e: Event) => onChange("width", e.target.value)}
              inputType=""
            />
          </div>
        )}
        {IsLocation(node) && IsBlockView() && (
          <div>
            <div>{TextResources.Inspector_Admin_Height}</div>
            <Input
              fontSize={FontSize.Standard}
              value={node.height ?? ""}
              onChange={(e: Event) => onChange("height", e.target.value)}
              inputType=""
              readOnly={true}
            />
          </div>
        )}
      </TabColumn>
      <TabColumn width={125}>
        <div className="statusDropdown">
          <div>{TextResources.Inspector_Admin_Status}</div>
          <Dropdown
            label=""
            items={statuses}
            keyProp={"id"}
            defaultValue={node?.statusId}
            valueProp={null}
            onChange={(value: any) => onChange("statusId", value.id)}
            listTop={31}
            borderRadius={5}
          ></Dropdown>
        </div>
        <div>
          <div>{TextResources.Inspector_Admin_Version}</div>
          <Input
            fontSize={FontSize.Standard}
            readOnly={true}
            value={node.version ?? ""}
            onChange={() => null}
            inputType=""
          />
        </div>
        {IsProduct(node) && (
          <div>
            <div>{TextResources.Inspector_Admin_Cost}</div>
            <Input
              fontSize={FontSize.Standard}
              value={node.cost ?? ""}
              onChange={(e: Event) => onChange("cost", e.target.value)}
              inputType=""
            />
          </div>
        )}

        {IsLocation(node) && IsBlockView() && (
          <div>
            <div>{TextResources.Inspector_Admin_Length}</div>
            <Input
              fontSize={FontSize.Standard}
              value={node.length ?? ""}
              onChange={(e: Event) => onChange("length", e.target.value)}
              inputType=""
            />
          </div>
        )}
      </TabColumn>
      <TabColumn width={465}>
        <div>
          <div>{TextResources.Inspector_Admin_Description}</div>
          <Textarea
            height={200}
            value={node.description ?? ""}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onChange("description", e.target.value)}
          ></Textarea>
        </div>
      </TabColumn>
    </>
  );
};

export default AdminContent;
