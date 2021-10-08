import { Node } from "../../models";
import { TerminalsComponent } from "./tabs/terminals";
import { RelationsComponent } from "./tabs/relations";
import { ParametersComponent } from "./tabs/parameters";
import { SimpleTypesComponent } from "./tabs/simpleTypes";

interface Props {
  node: Node;
  index: number;
}

const InspectorContent = ({ node, index }: Props) => (
  <>
    {index === 1 && <ParametersComponent node={node} />}
    {index === 2 && <TerminalsComponent node={node} />}
    {index === 3 && <RelationsComponent node={node} />}
    {index === 4 && <SimpleTypesComponent node={node} />}
  </>
);

export default InspectorContent;
