import { Node } from "../../../models";
import {
  RelationTabComponent,
  TerminalsTabComponent,
  TechInfoTabComponent,
} from ".";

interface Props {
  node: Node;
  index?: number;
}

const TabContent = ({ node, index }: Props) => {
  return (
    <>
      {index === 1 && <TechInfoTabComponent node={node} />}
      {index === 2 && <TerminalsTabComponent node={node} />}
      {index === 3 && <RelationTabComponent node={node} />}
      {/*index === 4 && <CommentsTabComponent node={node} />*/}
    </>
  );
};

export default TabContent;
