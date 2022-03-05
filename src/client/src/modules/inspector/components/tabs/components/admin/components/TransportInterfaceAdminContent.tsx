import React from "react";
import moment from "moment/moment.js";
import { TextResources } from "../../../../../../../assets/text/TextResources";
import { TabColumn } from "./styled/TabColumn";
import { Input, TextArea } from "../../../../../../../compLibrary/input/text";
import { FontSize } from "../../../../../../../compLibrary/font";
import { Edge, EnumBase, Interface, Project, Transport } from "../../../../../../../models";
import { changeInterfaceValue, changeTransportValue } from "../../../../../../../redux/store/project/actions";
import { Dropdown } from "../../../../../../../compLibrary/dropdown/mimir";
import { useAppDispatch } from "../../../../../../../redux/store";
import { GetRdsIdEdge } from "../../../../../../../helpers";
import { GetReferenceDesignationEdge } from "../../../../../../../helpers/GetReferenceDesignation";
import { DropDownItem } from "../../../../../../../compLibrary/dropdown/typeEditor/Dropdown";

type Event = React.ChangeEvent<HTMLInputElement>;

interface Props {
  edge: Edge;
  project: Project;
  statuses: EnumBase[];
}

type Element = Transport | Interface;

export const TransportInterfaceAdminContent = ({ edge, project, statuses }: Props) => {
  const dispatch = useAppDispatch();
  const onChange = <K extends keyof Element>(key: K, value: Element[K]) =>
    edge.transport ? dispatch(changeTransportValue(edge.id, key, value)) : dispatch(changeInterfaceValue(edge.id, key, value));

  const element = edge.transport ?? edge.interface;

  return (
    <>
      <TabColumn width={250}>
        <div>
          <div>{TextResources.Inspector_Admin_Id}</div>
          <Input fontSize={FontSize.STANDARD} readOnly={true} value={element.id ?? ""} onChange={() => null} inputType="" />
        </div>
        <div>
          <div>{TextResources.Inspector_Admin_RDS}</div>
          <Input
            fontSize={FontSize.STANDARD}
            readOnly={true}
            value={GetRdsIdEdge(edge) ?? ""}
            onChange={() => null}
            inputType=""
          />
        </div>
        <div>
          <div>{TextResources.Inspector_Admin_Semantic_Id}</div>
          <Input
            fontSize={FontSize.STANDARD}
            readOnly={true}
            value={element.semanticReference ?? ""}
            onChange={() => null}
            inputType=""
          />
        </div>
      </TabColumn>
      <TabColumn width={250}>
        <div>
          <div>{TextResources.Inspector_Admin_Service}</div>
          <Input
            fontSize={FontSize.STANDARD}
            readOnly={edge.isLocked}
            value={element.label ?? ""}
            onChange={(e: Event) => onChange("label", e.target.value)}
            inputType=""
          />
        </div>
        <div>
          <div>{TextResources.Inspector_Admin_Type}</div>
          <Input fontSize={FontSize.STANDARD} readOnly={true} value={element.name} onChange={() => null} inputType="" />
        </div>
        <div>
          <div>{TextResources.Inspector_Admin_Updated_By}</div>
          <Input
            fontSize={FontSize.STANDARD}
            readOnly={true}
            value={element.updatedBy ?? ""}
            onChange={() => null}
            inputType=""
          />
        </div>
      </TabColumn>
      <TabColumn width={125}>
        <div>
          <div>{TextResources.Inspector_Admin_Updated_Date}</div>
          <Input
            fontSize={FontSize.STANDARD}
            readOnly={true}
            value={moment(element.updated).format("DD/MM/YYYY") ?? ""}
            onChange={() => null}
            inputType=""
          />
        </div>
        <div>
          <div>{TextResources.Inspector_Admin_Created_Date}</div>
          <Input
            fontSize={FontSize.STANDARD}
            readOnly={true}
            onChange={() => null}
            inputType=""
            value={moment(element.created).format("DD/MM/YYYY") ?? ""}
          />
        </div>
        <div>
          <div>{TextResources.Inspector_Admin_Designation}</div>
          <Input
            fontSize={FontSize.STANDARD}
            readOnly={true}
            value={GetReferenceDesignationEdge(edge, project) ?? ""}
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
            defaultValue={element?.statusId}
            valueProp={null}
            onChange={(value: DropDownItem<EnumBase>) => onChange("statusId", value.id)}
            listTop={31}
            borderRadius={5}
            disabled={edge.isLocked}
          ></Dropdown>
        </div>
        <div>
          <div>{TextResources.Inspector_Admin_Version}</div>
          <Input fontSize={FontSize.STANDARD} readOnly={true} value={element.version ?? ""} onChange={() => null} inputType="" />
        </div>
      </TabColumn>
      <TabColumn width={465}>
        <div>
          <div>{TextResources.Inspector_Admin_Description}</div>
          <TextArea
            height={200}
            value={element.description ?? ""}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onChange("description", e.target.value)}
            readOnly={edge.isLocked}
          ></TextArea>
        </div>
      </TabColumn>
    </>
  );
};
