import { Node } from "../../../models/project";
import { createId } from "../../flow/utils";
import { TabColumn, TabInput, TabParagraph } from "./styled";

interface Props {
  width?: string | undefined;
  height?: string | undefined;
  node: Node;
}

const InspectorContent = ({ width, height, node }: Props) => {
  return (
    <TabColumn>
      {node &&
        node.attributes.map((j, i) => (
          <div key={createId()}>
            <TabParagraph>{node.attributes[i].key}</TabParagraph>
            <TabInput
              width={width}
              height={height}
              value={node.attributes[i].value}
              onChange={() => null}
            />
          </div>
        ))}
    </TabColumn>
  );
};

export default InspectorContent;
