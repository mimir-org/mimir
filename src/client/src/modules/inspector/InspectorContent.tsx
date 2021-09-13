import { Node, Project } from "../../models";
import { TerminalsComponent, ParametersComponent } from "./tabs";
import { RelationsComponent } from "./tabs/relations";

interface Props {
  node: Node;
  project: Project;
  index?: number;
}

const InspectorContent = ({ node, index, project }: Props) => (
  <>
    {index === 1 && <ParametersComponent node={node} />}
    {index === 2 && <TerminalsComponent node={node} />}
    {index === 3 && <RelationsComponent node={node} project={project} />}
  </>
);

export default InspectorContent;
