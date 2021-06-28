import { Edge } from "../../../../models";
import { TechInfoTabEdgeComponent } from ".";

interface Props {
  edge: Edge;
  index?: number;
}

const TabEdgeContent = ({ edge, index }: Props) => {
  return (
    <>
      {index === 1 && <TechInfoTabEdgeComponent edge={edge} />}
      {/* {index === 2 && <TerminalsTabComponent node={node} />} */}
      {/* {index === 3 && <RelationTabComponent node={node} />} */}
    </>
  );
};

export default TabEdgeContent;
