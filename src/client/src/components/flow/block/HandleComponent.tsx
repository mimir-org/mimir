import red from "../../../redux/store";
import { Aspect, Connector } from "../../../models";
import { HandleBox } from "../../../compLibrary/blockView";
import { Handle } from "react-flow-renderer";
import { GetBlockHandleType } from "../helpers/block";
import {
  GetConnectorIcon,
  GetHandlePosition,
  IsInputTerminal,
  IsOutputTerminal,
  IsLocationTerminal,
  SetTerminalYPos,
} from "../helpers/common";

interface Props {
  aspect: Aspect;
  terminals: Connector[];
}

const HandleComponent = ({ aspect, terminals }: Props) => {
  const splitView = red.store.getState().splitView.visible as boolean;
  const className = "react-flow__handle-block";
  let inputCount = 0;
  let outputCount = 0;

  return (
    <>
      {terminals.map((conn: Connector) => {
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
            visible={
              splitView
                ? conn.visible
                : aspect === Aspect.Function
                ? !IsLocationTerminal(conn) && conn.visible
                : conn.visible
            }
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
