import { Elements } from "react-flow-renderer";
import CreateLocationNode from "./CreateLocationNode";
import { Project, NODE_TYPE } from "../../../../models/project";

const CreateLocationNodes = (project: Project): Elements => {
  const initialElements: Elements = [];
  if (!project) return;

  project.nodes.forEach((node) => {
    if (node.type === NODE_TYPE.LOCATION) {
      let locationNode = CreateLocationNode(node);
      initialElements.push(locationNode);
    }
  });

  return initialElements;
};

export default CreateLocationNodes;
