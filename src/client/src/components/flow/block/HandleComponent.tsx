import red from "../../../redux/store";
import { Connector, Node } from "../../../models";
import { HandleBox } from "../../../compLibrary/blockView";
import { Handle } from "react-flow-renderer";
import { GetConnectorIcon, GetHandlePosition } from "../helpers/common";
import { IsMainConnectNode } from "../helpers/block/connectView";
import {
  FilterConnectors,
  GetBlockHandleType,
  StackTerminals,
} from "../helpers/block";

interface Props {
  data: Node;
}

const HandleComponent = ({ data }: Props) => {
  const locationNode = red.store.getState().splitView.node as Node;
  const isSplitNode = locationNode !== null;
  const sortedTerminals = FilterConnectors(data?.connectors, data?.aspect);
  const className = "react-flow__handle-block";

  return (
    <>
      {sortedTerminals.map((conn: Connector) => {
        const [type, pos] = GetBlockHandleType(conn);
        return (
          <HandleBox
            order={StackTerminals(conn.order)}
            id={"handle-" + conn.id}
            position={GetHandlePosition(pos)}
            key={"key-" + conn.id}
            visible={conn.visible}
            icon={GetConnectorIcon(conn.color)}
            splitNode={isSplitNode}
            mainConnectNode={IsMainConnectNode(data.id)}
          >
            <Handle
              type={type}
              position={pos}
              id={conn.id}
              className={className}
            />
          </HandleBox>
        );
      })}
    </>
  );
};

export default HandleComponent;
