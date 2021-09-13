import { Node } from "../../../../models";
import { RelationsContent } from ".";
import { RelationsBody } from "./styled";
import { TextResources } from "../../../../assets/text";

interface Props {
  node: Node;
}

const RelationComponent = ({ node }: Props) => {
  const terminals = node.connectors?.filter((conn) => conn.visible);
  const hasTerminals = terminals.length > 0;

  return (
    <RelationsBody>
      {hasTerminals && (
        <>
          <RelationsContent
            terminals={terminals}
            label={TextResources.Inspector_Relations_Active_Terminal_Types}
          />
          <RelationsContent
            terminals={terminals}
            label={TextResources.Inspector_Relations_Terminal_Input}
          />
          <RelationsContent
            terminals={terminals}
            label={TextResources.Inspector_Relations_Terminal_Output}
          />
          <RelationsContent
            terminals={terminals}
            label={TextResources.Inspector_Relations_Transport}
          />
        </>
      )}
    </RelationsBody>
  );
};
export default RelationComponent;
