import React, { useEffect } from "react";
import moment from "moment/moment.js";
import { TextResources } from "../../../../../../../assets/text/TextResources";
import { TabColumn } from "./styled/TabColumn";
import { Input, TextArea } from "../../../../../../../compLibrary/input/text";
import { FontSize } from "../../../../../../../assets/font";
import { EnumBase } from "../../../../../../../models";
import { Node, Project } from "@mimirorg/modelbuilder-types";
import { changeNodeValue } from "../../../../../../../redux/store/project/actions";
import { Dropdown } from "../../../../../../../compLibrary/dropdown/mimir/Dropdown";
import { useAppDispatch } from "../../../../../../../redux/store";
import { GetRdsId, GetReferenceDesignation } from "../../../../../../../helpers";
// import { DropDownItem } from "../../../../../../../compLibrary/dropdown/typeEditor/Dropdown";
import { useDebounceState } from "../../../../../../../hooks/useDebounceState";
import { IsAspectNode, IsProduct } from "../../../../../../../helpers/Aspects";

type Event = React.ChangeEvent<HTMLInputElement>;

interface Props {
  node: Node;
  project: Project;
  statuses: EnumBase[];
}

export const NodeAdminContent = ({ node, project, statuses }: Props) => {
  const dispatch = useAppDispatch();
  const [nodeLabel, setNodeLabel, debouncedNodeLabel] = useDebounceState("");
  const onChange = <K extends keyof Node>(key: K, value: Node[K]) => dispatch(changeNodeValue(node.id, key, value));

  useEffect(() => {
    debouncedNodeLabel && dispatch(changeNodeValue(node.id, "label", debouncedNodeLabel));
    return () => setNodeLabel(""); // Reset debounced state on cleanup
  }, [debouncedNodeLabel, node.id, dispatch, setNodeLabel]);

  return (
    <>
      <TabColumn width={250}>
        <div>
          <div>{TextResources.ID}</div>
          <Input fontSize={FontSize.STANDARD} readOnly value={node.id ?? ""} onChange={() => null} inputType="" />
        </div>
        <div>
          <div>{TextResources.ADMIN_RDS}</div>
          <Input fontSize={FontSize.STANDARD} readOnly value={GetRdsId(node) ?? ""} onChange={() => null} inputType="" />
        </div>
        <div>
          <div>{TextResources.ADMIN_SEMANTIC_ID}</div>
          <Input fontSize={FontSize.STANDARD} readOnly value={node.semanticReference ?? ""} onChange={() => null} inputType="" />
        </div>
      </TabColumn>
      <TabColumn width={250}>
        <div>
          <div>{TextResources.ADMIN_SERVICE}</div>
          <Input
            fontSize={FontSize.STANDARD}
            readOnly={node.isLocked}
            value={nodeLabel ? nodeLabel : node.label}
            onChange={(e: Event) => setNodeLabel(e.target.value)}
          />
        </div>
        <div>
          <div>{TextResources.ADMIN_TYPE}</div>
          <Input fontSize={FontSize.STANDARD} readOnly value={node.name} onChange={() => null} inputType="" />
        </div>
        <div>
          <div>{TextResources.ADMIN_UPDATED_BY}</div>
          <Input fontSize={FontSize.STANDARD} readOnly value={node.updatedBy ?? ""} onChange={() => null} inputType="" />
        </div>
      </TabColumn>
      <TabColumn width={125}>
        <div>
          <div>{TextResources.ADMIN_UPDATED_DATE}</div>
          <Input
            fontSize={FontSize.STANDARD}
            readOnly
            value={moment(node.updated).format("DD/MM/YYYY") ?? ""}
            onChange={() => null}
            inputType=""
          />
        </div>
        <div>
          <div>{TextResources.ADMIN_CREATED_DATE}</div>
          <Input
            fontSize={FontSize.STANDARD}
            readOnly
            onChange={() => null}
            inputType=""
            value={moment(node.created).format("DD/MM/YYYY") ?? ""}
          />
        </div>
        <div>
          <div>{TextResources.ADMIN_DESIGNATION}</div>
          <Input
            fontSize={FontSize.STANDARD}
            readOnly
            value={GetReferenceDesignation(node, project) ?? ""}
            onChange={() => null}
            inputType=""
          />
        </div>
      </TabColumn>
      {/* <TabColumn width={125}>
        <div className="statusDropdown">
          <div>{TextResources.ADMIN_STATUS}</div>
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
          <div>{TextResources.ADMIN_VERSION}</div>
          <Input fontSize={FontSize.STANDARD} readOnly value={node.version ?? ""} onChange={() => null} inputType="" />
        </div>
        {IsProduct(node) && (
          <div>
            <div>{TextResources.ADMIN_COST}</div>
            <Input fontSize={FontSize.STANDARD} readOnly value={""} onChange={() => null} inputType="" />
          </div>
        )}
      </TabColumn> */}
      <TabColumn width={465}>
        <div>
          <div>{TextResources.ADMIN_DESCRIPTION}</div>
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
