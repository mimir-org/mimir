import { useDispatch } from "react-redux";
import { changeNodeValue } from "../../../redux/store/project/actions";
import { TabColumn } from "./styled";
import { Input, Select, Textarea } from "../../../componentLibrary";
import { Node, Project } from "../../../models/project";
import { GetRdsId, GetReferenceDesignation } from "../../../assets/helpers";
import moment from "moment/moment.js";

interface Props {
  node: Node;
  project: Project;
}

const TabAdminContent = ({ node, project }: Props) => {
  const dispatch = useDispatch();

  const handleOnChange = (e, key: string) => {
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
            value={node.semanticId ?? ""}
            onChange={(e) => handleOnChange(e, "semanticId")}
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
      </TabColumn>
      <TabColumn>
        <div>
          <div>Service Description</div>
          <Input
            value={node.label}
            onChange={(e) => handleOnChange(e, "label")}
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
          <div>Status</div>
          <Select defaultValue={"Equinor"}>
            <option value="Ikke satt">Ikke satt</option>
            <option value="Equinor">Equinor</option>
            <option value="Aibel">Aibel</option>
          </Select>
        </div>
        <div>
          <div>Version</div>
          <Input
            value={node.version ?? ""}
            onChange={(e) => handleOnChange(e, "version")}
            inputType=""
          />
        </div>
      </TabColumn>
      <TabColumn>
        <div>
          <div>Contractor</div>
          <Select>
            <option value="0">Ikke satt</option>
            <option value="1">Equinor</option>
            <option value="2">Aibel</option>
          </Select>
        </div>
        <div>
          <div>Tag Number</div>
          <Input
            value={node.tagNumber ?? ""}
            onChange={(e) => handleOnChange(e, "tagNumber")}
            inputType=""
          />
        </div>
      </TabColumn>
      <TabColumn>
        <div>
          <div>Description</div>
          <Textarea width="400" height="90">
            {node.description ?? ""}
          </Textarea>
        </div>
      </TabColumn>
    </>
  );
};

export default TabAdminContent;
