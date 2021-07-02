import red from "../../../redux/store";
import { Connector, Node } from "../../../models";
import { HandleBox } from "../../../compLibrary/blockView";
import { Handle } from "react-flow-renderer";
import { FilterTerminals, GetBlockHandleType } from "../helpers/block";
import {
  GetConnectorIcon,
  GetHandlePosition,
  IsInputTerminal,
  IsOutputTerminal,
  IsLocationTerminal,
  SetTerminalYPos,
} from "../helpers/common";

interface Props {
  data: Node;
}

const HandleComponent = ({ data }: Props) => {
  const sortedTerminals = FilterTerminals(data.connectors, data.aspect);
  const splitView = red.store.getState().splitView.visible as boolean;
  const className = "react-flow__handle-block";
  let inputCount = 0;
  let outputCount = 0;

  const visible = (conn: Connector) => {
    if (splitView) return conn.visible;
    return conn.visible && !IsLocationTerminal(conn);
  };

  return (
    <>
      {sortedTerminals.map((conn: Connector) => {
        const [type, pos] = GetBlockHandleType(conn);
        if (!IsLocationTerminal(conn)) {
          if (IsInputTerminal(conn)) inputCount++;
          if (IsOutputTerminal(conn)) outputCount++;
        }

        return (
          <HandleBox
            input={SetTerminalYPos(inputCount)}
            output={SetTerminalYPos(outputCount)}
            id={"handle-" + conn.id}
            position={GetHandlePosition(pos)}
            key={"key-" + conn.id}
            visible={visible(conn)}
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
