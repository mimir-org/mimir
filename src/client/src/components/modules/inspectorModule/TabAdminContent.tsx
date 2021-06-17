import moment from "moment/moment.js";
import { useDispatch } from "react-redux";
import { changeNodeValue } from "../../../redux/store/project/actions";
import { Contractor } from "../../../redux/store/common/types";
import { TabColumn } from "../../../compLibrary/box/inspector";
import { Input, Select, Textarea } from "../../../compLibrary";
import { Node, Project } from "../../../models";
import { GetRdsId, GetReferenceDesignation } from "../../../assets/helpers";
import { IsLocation } from "../../flow/helpers/common";
import { IsBlockView } from "../../flow/helpers/block";
import { BUILD_STATUS } from "../../../models/project";

interface Props {
  node: Node;
  project: Project;
  contractors: Contractor[];
}

const TabAdminContent = ({ node, project, contractors }: Props) => {
  const dispatch = useDispatch();
  const handleOnChange = (e: any, key: string) => {
    dispatch(changeNodeValue(node.id, key, e.target.value));
  };

  return (
    <>
      <TabColumn>
        <div>
          <div>Id</div>
          <Input
            readOnly={true}
            value={node.id ?? ""}
            onChange={() => null}
            inputType=""
          />
        </div>
        <div>
          <div>RDS</div>
          <Input
            readOnly={true}
            value={GetRdsId(node)}
            onChange={() => null}
            inputType=""
          />
        </div>
        <div>
          <div>Semantic ID</div>
          <Input
            value={node.semanticReference ?? ""}
            onChange={(e: any) => handleOnChange(e, "semanticId")}
            inputType=""
          />
        </div>
      </TabColumn>
      <TabColumn>
        <div>
          <div>Reference Designation</div>
          <Input
            readOnly={true}
            value={GetReferenceDesignation(node, project)}
            onChange={() => null}
            inputType=""
          />
        </div>
        <div>
          <div>Updated by</div>
          <Input
            readOnly={true}
            value={node.updatedBy}
            onChange={() => null}
            inputType=""
          />
        </div>
        <div>
          <div>Updated Date</div>
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
          <div>Service Description</div>
          <Input
            value={node.label}
            onChange={(e: any) => handleOnChange(e, "label")}
            inputType=""
          />
        </div>
        <div>
          <div>Type name</div>
          <Input
            readOnly={true}
            value={node.name}
            onChange={() => null}
            inputType=""
          />
        </div>
        {IsLocation(node) && IsBlockView() && (
          <div>
            <div>Width (m)</div>
            <Input
              value={node.width}
              onChange={(e: any) => handleOnChange(e, "width")}
              inputType=""
            />
          </div>
        )}
      </TabColumn>
      <TabColumn>
        <div>
          <div>Status</div>
          <Select
            value={node.status ?? BUILD_STATUS.NotSet}
            onChange={(e: any) => handleOnChange(e, "status")}
          >
            {Object.values(BUILD_STATUS)?.map((x) => (
              <option key={x} value={x}>
                {x}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <div>Version</div>
          <Input
            value={node.version ?? ""}
            onChange={(e: any) => handleOnChange(e, "version")}
            inputType=""
          />
        </div>
        {IsLocation(node) && IsBlockView() && (
          <div>
            <div>Length (m)</div>
            <Input
              value={node.length}
              onChange={(e: any) => handleOnChange(e, "length")}
              inputType=""
            />
          </div>
        )}
      </TabColumn>
      <TabColumn>
        <div>
          <div>Contractor</div>
          <Select
            value={node.contractor ?? BUILD_STATUS.NotSet}
            onChange={(e: any) => handleOnChange(e, "contractor")}
          >
            <option value={BUILD_STATUS.NotSet}>{BUILD_STATUS.NotSet}</option>
            {contractors?.map((contractor) => (
              <option key={contractor.id} value={contractor.name}>
                {contractor.name}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <div>Tag Number</div>
          <Input
            value={node.tagNumber ?? ""}
            onChange={(e: any) => handleOnChange(e, "tagNumber")}
            inputType=""
          />
        </div>
        {IsLocation(node) && IsBlockView() && (
          <div>
            <div>Height (m)</div>
            <Input
              value={node.height}
              onChange={(e: any) => handleOnChange(e, "height")}
              inputType=""
              readOnly={true}
            />
          </div>
        )}
      </TabColumn>
      <TabColumn>
        <div>
          <div>Description</div>
          <Textarea
            width="300"
            height="90"
            value={node.description ?? ""}
            onChange={(e: any) => handleOnChange(e, "description")}
          ></Textarea>
        </div>
      </TabColumn>
    </>
  );
};

export default TabAdminContent;
