import { Node, Project } from "../../../models";
import {
  RelationComponent,
  TerminalsComponent,
  TechInfoComponent,
} from "./tabs";

interface Props {
  node: Node;
  project: Project;
  index?: number;
}

const TabContent = ({ node, index, project }: Props) => {
  return (
    <>
      {index === 1 && <TechInfoComponent node={node} />}
      {index === 2 && <TerminalsComponent node={node} />}
      {index === 3 && <RelationComponent node={node} project={project} />}
      {/*index === 4 && <CommentsTabComponent node={node} />*/}
    </>
  );
};

export default TabContent;
