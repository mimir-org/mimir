import { Elements } from "react-flow-renderer";
import CreateLocationNode from "./CreateLocationNode";
import { CreateElementEdge } from "..";
import store from "../../../../redux/store";
import {
  Project,
  Node,
  EDGE_TYPE,
  EdgeType,
  Edge,
} from "../../../../models/project";

const CreateLocationNodes = (project: Project, node: Node): Elements => {
  const initialElements: Elements = [];
  if (!project) return;
  const edges = store.getState().projectState.project.edges;
  const edge = edges.find(
    (x) => x.id === "514bd0cf-dbb2-fcab-e946-4ac747ccd2ea"
  ) as Edge;

  initialElements.push(CreateLocationNode(node));
  const elementEdge = CreateElementEdge(edge, EDGE_TYPE.BLOCK as EdgeType);
  initialElements.push(elementEdge);

  return initialElements;
};

export default CreateLocationNodes;
