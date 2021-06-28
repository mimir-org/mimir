import red from "../../../redux/store";
import { Node } from "../../../models";
import { HandleBox } from "../../../compLibrary/blockView";
import { Handle } from "react-flow-renderer";
import { GetConnectorIcon, GetHandlePosition } from "../helpers/common";
import { IsMainConnectNode } from "../helpers/block/connectView";
import {
  CountInputTerminals,
  CountOutputTerminals,
  FilterConnectors,
  GetBlockHandleType,
} from "../helpers/block";

interface Props {
  data: Node;
}

const calculateYPos = (amount: number) => {
  if (amount === 1 || amount === 0) return 27;
  if (amount === 2) return 37;
  if (amount === 3) return 57;
  if (amount >= 4) return 103;
};

const HandleComponent = ({ data }: Props) => {
  const locationNode = red.store.getState().splitView.node as Node;
  const isSplitNode = locationNode !== null;
  let sortedTerminals = FilterConnectors(data.connectors, data.aspect);

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
            icon={GetConnectorIcon(conn.color)}
            splitNode={isSplitNode}
            mainConnectNode={IsMainConnectNode(data.id)}
            inputYPos={calculateYPos(CountInputTerminals(sortedTerminals))}
            outputYPos={calculateYPos(CountOutputTerminals(sortedTerminals))}
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
