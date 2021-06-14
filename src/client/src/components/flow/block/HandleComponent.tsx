import { Node } from "../../../models/project";
import { HandleBox } from "../../../componentLibrary/blockView";
import { GetBlockHandleType, StackTerminals } from "../helpers/block";
import { Handle } from "react-flow-renderer";
import {
  GetConnectorIcon,
  GetHandlePosition,
  GetHandleType,
} from "../helpers/common";

interface Props {
  data: Node;
  type?: string;
}

const HandleComponent = ({ data, type }: Props) => {
  return type === "block" ? (
    <>
      {data.connectors?.map((conn) => {
        const [type, pos, className] = GetBlockHandleType(conn);
        if (conn.visible) {
          return (
            <HandleBox
              id={"handle-" + conn.id}
              position={GetHandlePosition(pos)}
              key={conn.id}
              order={StackTerminals(conn.order)}
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
