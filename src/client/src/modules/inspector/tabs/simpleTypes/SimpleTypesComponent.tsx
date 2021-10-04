import { Node } from "../../../../models";

interface Props {
  node: Node;
}

/**
 * Component for the Simple Types Inspector tab for the Product Aspect.
 * @param param0
 */
const SimpleTypesComponent = ({ node }: Props) => {
  return (
    <>
      <div>{node.name}</div>
    </>
  );
};

export default SimpleTypesComponent;
