import { Node } from "../../../models/project";
import { HandleBox } from "../../../componentLibrary/blockView";
import { GetBlockHandleType, StackTerminals } from "../helpers/block";
import { Handle, Position } from "react-flow-renderer";
import {
  GetConnectorIcon,
  GetHandlePosition,
  GetHandleType,
} from "../helpers/common";

interface Props {
  visible: boolean;
  data: Node;
  type?: string;
}

const HandleComponent = ({ visible, data, type }: Props) => {
  let inputCount = 0;
  let outputCount = 0;
  return type === "block" ? (
    <>
      {visible &&
        data.connectors?.map((conn) => {
          const [type, pos, className] = GetBlockHandleType(conn);
          if (conn.visible) {
            if (pos === Position.Right) outputCount++;
            if (pos === Position.Left) inputCount++;
            return (
              <HandleBox
                id={"handle-" + conn.id}
                position={GetHandlePosition(pos)}
                key={conn.id}
                inputCount={StackTerminals(inputCount)}
                outputCount={StackTerminals(outputCount)}
              >
                <Handle
                  type={type}
                  position={pos}
                  id={conn.id}
                  key={conn.id}
                  className={className}
                />
                <img
                  src={GetConnectorIcon(conn.terminal)}
                  alt="icon"
                  className="connector"
                />
              </HandleBox>
            );
          }
          return null;
        })}
    </>
  ) : (
    <>
      {/* TODO: Remove */}
      {data.connectors?.map((connector) => {
        const [typeHandler, positionHandler] = GetHandleType(connector);
        return (
          <Handle
            type={typeHandler}
            position={positionHandler}
            id={connector.id}
            key={connector.id}
            style={{ visibility: "hidden" }}
          />
        );
      })}
    </>
  );
};

export default HandleComponent;
