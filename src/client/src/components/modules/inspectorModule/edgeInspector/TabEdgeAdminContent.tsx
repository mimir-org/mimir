import { useDispatch } from "react-redux";
import { TabColumn } from "../../../../compLibrary/box/inspector";
import { Input } from "../../../../compLibrary";
import { Edge, Project } from "../../../../models";
import { DeleteNodeButton, GetRelationName } from "./../helpers";
import { removeEdge } from "../../../../redux/store/project/actions";
import { TextResources } from "../../../../assets/text";

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
          <div>{TextResources.Inspector_EdgeAdmin_Id}</div>
          <Input
            readOnly={true}
            value={edge.id ?? ""}
            onChange={() => null}
            inputType=""
          />
        </div>
        <div>
          <div>{TextResources.Inspector_EdgeAdmin_Relation}</div>
          <Input
            readOnly={true}
            value={GetRelationName(edge.fromConnector?.relationType)}
            onChange={() => null}
            inputType=""
          />
        </div>
        <div>
          <div>{TextResources.Inspector_EdgeAdmin_Template}</div>
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
          <div>{TextResources.Inspector_EdgeAdmin_Source}</div>
          <Input
            value={
              (edge.fromNode.label ?? edge.fromNode.name) +
              " - " +
              edge.fromNodeId
            }
            onChange={() => null}
            inputType=""
          />
        </div>
        <div>
          <div>{TextResources.Inspector_EdgeAdmin_Target}</div>
          <Input
            readOnly={true}
            value={
              (edge.toNode.label ?? edge.toNode.name) + " - " + edge.toNodeId
            }
            onChange={() => null}
            inputType=""
          />
        </div>
        <div>
          <div>{TextResources.Inspector_EdgeAdmin_Project}</div>
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
