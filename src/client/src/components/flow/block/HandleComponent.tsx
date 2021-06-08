import { Connector } from "../../../models/project";
import { HandleBox } from "../../../componentLibrary/blockView";
import { GetBlockHandleType } from "../helpers/block";
import { Handle } from "react-flow-renderer";
import {
  GetConnectorIcon,
  GetHandlePosition,
  GetHandleType,
} from "../helpers/common";

interface Props {
  drawConns: boolean;
  data: any;
  list: Connector[];
  selectedConn: Connector;
  type?: string;
}

const HandleComponent = ({
  drawConns,
  data,
  list,
  selectedConn,
  type,
}: Props) => {
  return type === "block" ? (
    <>
      {drawConns &&
        list?.map((conn) => {
          const [type, pos, className] = GetBlockHandleType(conn);
          if (selectedConn?.id === conn.id) {
            return (
              <HandleBox
                id={"handle-" + conn.id}
                position={GetHandlePosition(pos)}
                key={conn.id}
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
