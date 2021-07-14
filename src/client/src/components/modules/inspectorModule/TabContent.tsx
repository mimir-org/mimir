import { Node, Project } from "../../../models";
import {
  RelationTabComponent,
  TerminalsTabComponent,
  TechInfoTabComponent,
} from ".";

interface Props {
  node: Node;
  project: Project;
  index?: number;
}

const TabContent = ({ node, index, project }: Props) => {
  return (
    <>
      {index === 1 && <TechInfoTabComponent node={node} />}
      {index === 2 && <TerminalsTabComponent node={node} />}
      {index === 3 && <RelationTabComponent node={node} project={project} />}
      {/*index === 4 && <CommentsTabComponent node={node} />*/}
    </>
  );
};

export default TabContent;
