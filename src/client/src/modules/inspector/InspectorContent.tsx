import { Node, Project } from "../../models";
import {
  RelationComponent,
  TerminalsComponent,
  ParametersComponent,
} from "./tabs";

interface Props {
  node: Node;
  project: Project;
  index?: number;
}

const InspectorContent = ({ node, index, project }: Props) => (
  <>
    {index === 1 && <ParametersComponent node={node} />}
    {index === 2 && <TerminalsComponent node={node} />}
    {index === 3 && <RelationComponent node={node} project={project} />}
  </>
);

export default InspectorContent;
