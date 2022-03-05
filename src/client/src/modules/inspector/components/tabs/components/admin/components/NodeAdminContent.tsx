import React, { useEffect } from "react";
import moment from "moment/moment.js";
import { TextResources } from "../../../../../../../assets/text/TextResources";
import { TabColumn } from "./styled/TabColumn";
import { Input, TextArea } from "../../../../../../../compLibrary/input/text";
import { FontSize } from "../../../../../../../compLibrary/font";
import { EnumBase, Node, Project } from "../../../../../../../models";
import { changeNodeValue } from "../../../../../../../redux/store/project/actions";
import { Dropdown } from "../../../../../../../compLibrary/dropdown/mimir";
import { useAppDispatch } from "../../../../../../../redux/store";
import { GetRdsId, GetReferenceDesignation, IsAspectNode, IsProduct } from "../../../../../../../helpers";
import { DropDownItem } from "../../../../../../../compLibrary/dropdown/typeEditor/Dropdown";
import { useDebounceState } from "../../../../../../../hooks/useDebounceState";

type Event = React.ChangeEvent<HTMLInputElement>;

interface Props {
  node: Node;
  project: Project;
  statuses: EnumBase[];
}

export const NodeAdminContent = ({ node, project, statuses }: Props) => {
  const dispatch = useAppDispatch();
  const [nodeLabel, setNodeLabel, debouncedNodeLabel] = useDebounceState(node.label);

  useEffect(() => {
    dispatch(changeNodeValue(node.id, "label", debouncedNodeLabel));
  }, [debouncedNodeLabel, dispatch, node.id]);

  const onChange = <K extends keyof Node>(key: K, value: Node[K]) => dispatch(changeNodeValue(node.id, key, value));

  return (
    <>
      <TabColumn width={250}>
        <div>
          <div>{TextResources.ID}</div>
          <Input fontSize={FontSize.STANDARD} readOnly value={node.id ?? ""} onChange={() => null} inputType="" />
        </div>
        <div>
          <div>{TextResources.INSPECTOR_ADMIN_RDS}</div>
          <Input fontSize={FontSize.STANDARD} readOnly value={GetRdsId(node) ?? ""} onChange={() => null} inputType="" />
        </div>
        <div>
          <div>{TextResources.INSPECTOR_ADMIN_SEMANTIC_ID}</div>
          <Input fontSize={FontSize.STANDARD} readOnly value={node.semanticReference ?? ""} onChange={() => null} inputType="" />
        </div>
      </TabColumn>
      <TabColumn width={250}>
        <div>
          <div>{TextResources.INSPECTOR_ADMIN_SERVICE}</div>
          <Input
            fontSize={FontSize.STANDARD}
            readOnly={IsAspectNode(node) || node.isLocked}
            value={nodeLabel}
            onChange={(e: Event) => setNodeLabel(e.target.value)}
          />
        </div>
        <div>
          <div>{TextResources.INSPECTOR_ADMIN_TYPE}</div>
          <Input fontSize={FontSize.STANDARD} readOnly value={node.name} onChange={() => null} inputType="" />
        </div>
        <div>
          <div>{TextResources.INSPECTOR_ADMIN_UPDATED_BY}</div>
          <Input fontSize={FontSize.STANDARD} readOnly value={node.updatedBy ?? ""} onChange={() => null} inputType="" />
        </div>
      </TabColumn>
      <TabColumn width={125}>
        <div>
          <div>{TextResources.INSPECTOR_ADMIN_UPDATED_DATE}</div>
          <Input
            fontSize={FontSize.STANDARD}
            readOnly
            value={moment(node.updated).format("DD/MM/YYYY") ?? ""}
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
            value={moment(node.created).format("DD/MM/YYYY") ?? ""}
          />
        </div>
        <div>
          <div>{TextResources.INSPECTOR_ADMIN_DESIGNATION}</div>
          <Input
            fontSize={FontSize.STANDARD}
            readOnly
            value={GetReferenceDesignation(node, project) ?? ""}
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
            defaultValue={node?.statusId}
            valueProp={null}
            onChange={(value: DropDownItem<EnumBase>) => onChange("statusId", value.id)}
            borderRadius={5}
            disabled={IsAspectNode(node) || node.isLocked}
          ></Dropdown>
        </div>
        <div>
          <div>{TextResources.INSPECTOR_ADMIN_VERSION}</div>
          <Input fontSize={FontSize.STANDARD} readOnly value={node.version ?? ""} onChange={() => null} inputType="" />
        </div>
        {IsProduct(node) && (
          <div>
            <div>{TextResources.INSPECTOR_ADMIN_COST}</div>
            <Input
              fontSize={FontSize.STANDARD}
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
          <div>{TextResources.INSPECTOR_ADMIN_DESCRIPTION}</div>
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
