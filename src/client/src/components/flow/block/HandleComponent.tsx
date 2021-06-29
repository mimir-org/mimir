import red from "../../../redux/store";
import { Connector, Node } from "../../../models";
import { HandleBox } from "../../../compLibrary/blockView";
import { Handle } from "react-flow-renderer";
import { GetConnectorIcon, GetHandlePosition } from "../helpers/common";
import { IsMainConnectNode } from "../helpers/block/connectView";
import { FilterConnectors, GetBlockHandleType } from "../helpers/block";

interface Props {
  data: Node;
}

// TODO: make dynamic/remove
// const calculateYPos = (amount: number) => {
//   if (amount === 1 || amount === 0) return 27;
//   if (amount === 2) return 37;
//   if (amount === 3) return 57;
//   if (amount >= 4) return 103;
// };

// TODO: make dynamic
const StackTerminals = (order: number) => {
  if (order === 0) return 50;
  if (order === 1) return 28;
  if (order === 2) return 72;
  if (order === 3) return 6;
  if (order === 4) return 94;
  if (order === 5) return -16;
  if (order === 6) return 116;
};

const HandleComponent = ({ data }: Props) => {
  const locationNode = red.store.getState().splitView.node as Node;
  const isSplitNode = locationNode !== null;
  let sortedTerminals = FilterConnectors(data.connectors, data.aspect);

  const className = "react-flow__handle-block";

  return (
    <>
      {sortedTerminals.map((conn: Connector) => {
        const [type, pos] = GetBlockHandleType(conn);
        return (
          <HandleBox
            id={"handle-" + conn.id}
            position={GetHandlePosition(pos)}
            key={conn.id}
            visible={conn.visible}
            icon={GetConnectorIcon(conn.color)}
            splitNode={isSplitNode}
            mainConnectNode={IsMainConnectNode(data.id)}
            // inputYPos={calculateYPos(CountInputTerminals(sortedTerminals))}
            // outputYPos={calculateYPos(CountOutputTerminals(sortedTerminals))}
            order={StackTerminals(conn.order)}
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
