import React from "react";
import moment from "moment/moment.js";
import { TextResources } from "../../../../../../../assets/text/TextResources";
import { TabColumn } from "./styled/TabColumn";
import { Input, TextArea } from "../../../../../../../compLibrary/input/text";
import { FontSize } from "../../../../../../../compLibrary/font";
import { Edge, EnumBase, Interface, Project, Transport } from "../../../../../../../models";
import { changeInterfaceValue, changeTransportValue } from "../../../../../../../redux/store/project/actions";
import { Dropdown } from "../../../../../../../compLibrary/dropdown/mimir/Dropdown";
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
          <div>{TextResources.ID}</div>
          <Input fontSize={FontSize.STANDARD} readOnly value={element.id ?? ""} onChange={() => null} inputType="" />
        </div>
        <div>
          <div>{TextResources.INSPECTOR_ADMIN_RDS}</div>
          <Input fontSize={FontSize.STANDARD} readOnly value={GetRdsIdEdge(edge) ?? ""} onChange={() => null} inputType="" />
        </div>
        <div>
          <div>{TextResources.INSPECTOR_ADMIN_SEMANTIC_ID}</div>
          <Input
            fontSize={FontSize.STANDARD}
            readOnly
            value={element.semanticReference ?? ""}
            onChange={() => null}
            inputType=""
          />
        </div>
      </TabColumn>
      <TabColumn width={250}>
        <div>
          <div>{TextResources.INSPECTOR_ADMIN_SERVICE}</div>
          <Input
            fontSize={FontSize.STANDARD}
            readOnly={edge.isLocked}
            value={element.label ?? ""}
            onChange={(e: Event) => onChange("label", e.target.value)}
            inputType=""
          />
        </div>
        <div>
          <div>{TextResources.INSPECTOR_ADMIN_TYPE}</div>
          <Input fontSize={FontSize.STANDARD} readOnly value={element.name} onChange={() => null} inputType="" />
        </div>
        <div>
          <div>{TextResources.INSPECTOR_ADMIN_UPDATED_BY}</div>
          <Input fontSize={FontSize.STANDARD} readOnly value={element.updatedBy ?? ""} onChange={() => null} inputType="" />
        </div>
      </TabColumn>
      <TabColumn width={125}>
        <div>
          <div>{TextResources.INSPECTOR_ADMIN_UPDATED_DATE}</div>
          <Input
            fontSize={FontSize.STANDARD}
            readOnly
            value={moment(element.updated).format("DD/MM/YYYY") ?? ""}
            onChange={() => null}
            inputType=""
          />
        </div>
        <div>
          <div>{TextResources.INSPECTOR_ADMIN_CREATED_DATE}</div>
          <Input
            fontSize={FontSize.STANDARD}
            readOnly
            onChange={() => null}
            inputType=""
            value={moment(element.created).format("DD/MM/YYYY") ?? ""}
          />
        </div>
        <div>
          <div>{TextResources.INSPECTOR_ADMIN_DESIGNATION}</div>
          <Input
            fontSize={FontSize.STANDARD}
            readOnly
            value={GetReferenceDesignationEdge(edge, project) ?? ""}
            onChange={() => null}
            inputType=""
          />
        </div>
      </TabColumn>
      <TabColumn width={125}>
        <div className="statusDropdown">
          <div>{TextResources.INSPECTOR_ADMIN_STATUS}</div>
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
          <div>{TextResources.INSPECTOR_ADMIN_VERSION}</div>
          <Input fontSize={FontSize.STANDARD} readOnly value={element.version ?? ""} onChange={() => null} inputType="" />
        </div>
      </TabColumn>
      <TabColumn width={465}>
        <div>
          <div>{TextResources.INSPECTOR_ADMIN_DESCRIPTION}</div>
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
