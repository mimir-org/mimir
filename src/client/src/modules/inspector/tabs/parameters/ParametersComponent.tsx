import { Node } from "../../../../models";
import { ParametersContent } from "./";

interface Props {
  node: Node;
}

const ParametersComponent = ({ node }: Props) => <ParametersContent element={node} elementIsLocked={node.isLocked} />;
export default ParametersComponent;
