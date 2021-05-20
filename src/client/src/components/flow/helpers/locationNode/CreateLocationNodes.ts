import { Elements } from "react-flow-renderer";
import CreateLocationNode from "./CreateLocationNode";
import { Project, NODE_TYPE, Node } from "../../../../models/project";

const CreateLocationNodes = (project: Project, node: Node): Elements => {
  const initialElements: Elements = [];
  if (!project) return;

  initialElements.push(CreateLocationNode(node));

  project.nodes.forEach((node) => {
    if (node.type === NODE_TYPE.LOCATION) {
      let locationNode = CreateLocationNode(node);
      //   initialElements.push(locationNode);
    }
  });

  return initialElements;
};

export default CreateLocationNodes;
