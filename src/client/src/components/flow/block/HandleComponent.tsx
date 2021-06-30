import red from "../../../redux/store";
import { Connector, Node } from "../../../models";
import { HandleBox } from "../../../compLibrary/blockView";
import { Handle } from "react-flow-renderer";
import { IsMainConnectNode } from "../helpers/block/connectView";
import {
  GetConnectorIcon,
  GetHandlePosition,
  IsInputConnector,
} from "../helpers/common";
import {
  FilterConnectors,
  GetBlockHandleType,
  SetTerminalYPos,
} from "../helpers/block";

interface Props {
  data: Node;
}

const HandleComponent = ({ data }: Props) => {
  const splitNode = red.store.getState().splitView.node as Node;
  const sortedTerminals = FilterConnectors(data.connectors, data.aspect);
  const className = "react-flow__handle-block";
  let inputCount = 0;
  let outputCount = 0;

  return (
    <>
      {sortedTerminals.map((conn: Connector) => {
        const [type, pos] = GetBlockHandleType(conn);
        if (IsInputConnector(conn)) inputCount++;
        else outputCount++;

        return (
          <HandleBox
            input={SetTerminalYPos(inputCount)}
            output={SetTerminalYPos(outputCount)}
            id={"handle-" + conn.id}
            position={GetHandlePosition(pos)}
            key={"key-" + conn.id}
            visible={conn.visible}
            icon={GetConnectorIcon(conn.color)}
            splitNode={splitNode !== null}
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
