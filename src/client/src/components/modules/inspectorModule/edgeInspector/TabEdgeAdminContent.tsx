import { useDispatch } from "react-redux";
import { TabColumn } from "../../../../compLibrary/box/inspector";
import { Input } from "../../../../compLibrary";
import { Edge, Project } from "../../../../models";
import { DeleteNodeButton, GetRelationName } from "./../helpers";
import { removeEdge } from "../../../../redux/store/project/actions";

interface Props {
  edge: Edge;
  project: Project;
}

const TabEdgeAdminContent = ({ edge, project }: Props) => {
  const dispatch = useDispatch();

  const handleOnDelete = () => {
    project.edges.forEach((x) => {
      if (x.id === edge.id) dispatch(removeEdge(edge.id));
    });
  };

  return (
    <>
      <TabColumn>
        <div>
          <div>Id</div>
          <Input
            readOnly={true}
            value={edge.id ?? ""}
            onChange={() => null}
            inputType=""
          />
        </div>
        <div>
          <div>Relation Type</div>
          <Input
            readOnly={true}
            value={GetRelationName(edge.fromConnector?.relationType)}
            onChange={() => null}
            inputType=""
          />
        </div>
        <div>
          <div>Template</div>
          <Input
            readOnly={true}
            value={edge.isTemplateEdge}
            onChange={() => null}
            inputType=""
          />
        </div>
      </TabColumn>
      <TabColumn>
        <div>
          <div>Source Node</div>
          <Input value={edge.fromConnectorId} onChange={null} inputType="" />
        </div>
        <div>
          <div>Target Node</div>
          <Input
            readOnly={true}
            value={edge.toNodeId}
            onChange={() => null}
            inputType=""
          />
        </div>
        <div>
          <div>Master Project ID</div>
          <Input
            readOnly={true}
            value={edge.masterProjectId}
            onChange={() => null}
            inputType=""
          />
        </div>
      </TabColumn>
      <TabColumn>
        <DeleteNodeButton handleClick={handleOnDelete} />
      </TabColumn>
    </>
  );
};

export default TabEdgeAdminContent;
