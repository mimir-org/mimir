import { Node } from "../../../models/project";
import red from "../../../redux/store";
import { HandleBox } from "../../../componentLibrary/blockView";
import { Handle } from "react-flow-renderer";
import { GetConnectorIcon, GetHandlePosition } from "../helpers/common";
import { FilterConnectors, GetBlockHandleType } from "../helpers/block";

interface Props {
  data: Node;
}

const HandleComponent = ({ data }: Props) => {
  const locationNode = red.store.getState().splitView.node as Node;
  const isSplitNode = locationNode !== null;
  let sortedTerminals = FilterConnectors(data.connectors, data.type);
  const className = "react-flow__handle-block";

  return (
    <>
      {sortedTerminals.map((conn) => {
        const [type, pos] = GetBlockHandleType(conn);
        return (
          <HandleBox
            id={"handle-" + conn.id}
            position={GetHandlePosition(pos)}
            key={conn.id}
            visible={conn.visible}
            icon={GetConnectorIcon(conn.terminal)}
            splitNode={isSplitNode}
          >
            <Handle
              type={type}
              position={pos}
              id={conn.id}
              key={conn.id}
              className={className}
            />
          </HandleBox>
        );
      })}
    </>
  );
};

export default HandleComponent;
