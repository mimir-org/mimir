import { Edge } from "../../../../models";
import { ParametersEdgeComponent } from ".";

interface Props {
  edge: Edge;
  index?: number;
}

const TabEdgeContent = ({ edge, index }: Props) => (
  <>
    {index === 1 && <ParametersEdgeComponent edge={edge} />}
    {/* {index === 2 && <TerminalsTabComponent node={node} />} */}
    {/* {index === 3 && <RelationTabComponent node={node} />} */}
  </>
);

export default TabEdgeContent;
