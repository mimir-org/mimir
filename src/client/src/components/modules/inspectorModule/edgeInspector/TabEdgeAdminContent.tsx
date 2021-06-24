import { useDispatch } from "react-redux";
import { TabColumn } from "../../../../compLibrary/box/inspector";
import { Input } from "../../../../compLibrary";
import { Edge, Project, RelationType } from "../../../../models";
import { DeleteNodeButton } from "./../helpers";
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

  const getRelationName = (type) => {
    if (type === RelationType.PartOf) return "Part Of";
    if (type === RelationType.HasLocation) return "Has Location";
    if (type === RelationType.FulfilledBy) return "Fulfilled By";
    if (type === undefined) return "Transport";
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
            value={getRelationName(edge.fromConnector?.relationType)}
            onChange={() => null}
            inputType=""
          />
        </div>
        <div>
          <div>Source Node</div>
          <Input value={edge.fromConnectorId} onChange={null} inputType="" />
        </div>
      </TabColumn>
      <TabColumn>
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
        <DeleteNodeButton handleClick={handleOnDelete} />
      </TabColumn>
    </>
  );
};

export default TabEdgeAdminContent;
