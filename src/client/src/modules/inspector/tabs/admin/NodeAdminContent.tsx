import React from "react";
import moment from "moment/moment.js";
import { TextResources } from "../../../../assets/text";
import { TabColumn } from "../../styled";
import { Input, TextArea } from "../../../../compLibrary/input/text";
import { FontSize } from "../../../../compLibrary/font";
import { EnumBase, Node, Project } from "../../../../models";
import { changeNodeValue } from "../../../../redux/store/project/actions";
import { Dropdown } from "../../../../compLibrary/dropdown/mimir";
import { useAppDispatch } from "../../../../redux/store";
import { GetRdsId, GetReferenceDesignation, IsAspectNode, IsProduct } from "../../../../helpers";
import { DropDownItem } from "../../../../compLibrary/dropdown/typeEditor/Dropdown";

type Event = React.ChangeEvent<HTMLInputElement>;

interface Props {
  node: Node;
  project: Project;
  statuses: EnumBase[];
}

const NodeAdminContent = ({ node, project, statuses }: Props) => {
  const dispatch = useAppDispatch();
  const onChange = <K extends keyof Node>(key: K, value: Node[K]) => dispatch(changeNodeValue(node.id, key, value));

  return (
    <>
      <TabColumn width={250}>
        <div>
          <div>{TextResources.Inspector_Admin_Id}</div>
          <Input fontSize={FontSize.Standard} readOnly={true} value={node.id ?? ""} onChange={() => null} inputType="" />
        </div>
        <div>
          <div>{TextResources.Inspector_Admin_RDS}</div>
          <Input fontSize={FontSize.Standard} readOnly={true} value={GetRdsId(node) ?? ""} onChange={() => null} inputType="" />
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
            readOnly={IsAspectNode(node) || node.isLocked}
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
          <Input fontSize={FontSize.Standard} readOnly={true} value={node.updatedBy ?? ""} onChange={() => null} inputType="" />
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
          <Input
            fontSize={FontSize.Standard}
            readOnly={true}
            onChange={() => null}
            inputType=""
            value={moment(node.created).format("DD/MM/YYYY") ?? ""}
          />
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
            onChange={(value: DropDownItem<EnumBase>) => onChange("statusId", value.id)}
            borderRadius={5}
            disabled={IsAspectNode(node) || node.isLocked}
          ></Dropdown>
        </div>
        <div>
          <div>{TextResources.Inspector_Admin_Version}</div>
          <Input fontSize={FontSize.Standard} readOnly={true} value={node.version ?? ""} onChange={() => null} inputType="" />
        </div>
        {IsProduct(node) && (
          <div>
            <div>{TextResources.Inspector_Admin_Cost}</div>
            <Input
              fontSize={FontSize.Standard}
              readOnly={IsAspectNode(node) || node.isLocked}
              value={node.cost ?? ""}
              onChange={(e: Event) => onChange("cost", Number(e.target.value))}
              inputType=""
            />
          </div>
        )}
      </TabColumn>
      <TabColumn width={465}>
        <div>
          <div>{TextResources.Inspector_Admin_Description}</div>
          <TextArea
            height={200}
            value={node.description ?? ""}
            readOnly={IsAspectNode(node) || node.isLocked}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onChange("description", e.target.value)}
          ></TextArea>
        </div>
      </TabColumn>
    </>
  );
};

export default NodeAdminContent;
