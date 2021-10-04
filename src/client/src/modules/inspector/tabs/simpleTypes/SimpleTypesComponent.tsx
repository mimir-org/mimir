import { Node } from "../../../../models";
import { SimpleTypesContent } from "./";

interface Props {
  node: Node;
}

/**
 * Component for the Simple Types Inspector tab for the Product Aspect.
 * @param param0
 */
const SimpleTypesComponent = ({ node }: Props) => <SimpleTypesContent element={node} elementIsLocked={node.isLocked} />;

export default SimpleTypesComponent;
