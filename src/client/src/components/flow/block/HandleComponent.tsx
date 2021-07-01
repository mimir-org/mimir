import { Connector, Node } from "../../../models";
import { HandleBox } from "../../../compLibrary/blockView";
import { Handle } from "react-flow-renderer";
import { FilterTerminals, GetBlockHandleType } from "../helpers/block";
import {
  GetConnectorIcon,
  GetHandlePosition,
  IsInputConnector,
  IsLocationTerminal,
  SetTerminalYPos,
} from "../helpers/common";

interface Props {
  data: Node;
}

const HandleComponent = ({ data }: Props) => {
  const sortedTerminals = FilterTerminals(data.connectors, data.aspect);
  const className = "react-flow__handle-block";
  let inputCount = 0;
  let outputCount = 0;

  return (
    <>
      {sortedTerminals.map((conn: Connector) => {
        const [type, pos] = GetBlockHandleType(conn);
        if (!IsLocationTerminal(conn)) {
          if (IsInputConnector(conn)) inputCount++;
          if (!IsInputConnector(conn)) outputCount++;
        }

        return (
          <HandleBox
            input={SetTerminalYPos(inputCount)}
            output={SetTerminalYPos(outputCount)}
            id={"handle-" + conn.id}
            position={GetHandlePosition(pos)}
            key={"key-" + conn.id}
            visible={conn.visible}
            icon={GetConnectorIcon(conn.color)}
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
