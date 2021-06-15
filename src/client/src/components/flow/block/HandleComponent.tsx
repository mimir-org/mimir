import { Node } from "../../../models/project";
import { HandleBox } from "../../../componentLibrary/blockView";
import { GetBlockHandleType, StackTerminals } from "../helpers/block";
import { Handle } from "react-flow-renderer";
import { GetConnectorIcon, GetHandlePosition } from "../helpers/common";

interface Props {
  data: Node;
  type?: string;
}

const HandleComponent = ({ data }: Props) => {
  return (
    <>
      {data.connectors?.map((conn) => {
        const [type, pos] = GetBlockHandleType(conn);
        return (
          <HandleBox
            id={"handle-" + conn.id}
            position={GetHandlePosition(pos)}
            key={conn.id}
            order={StackTerminals(conn.order)}
            visible={conn.visible}
          >
            <Handle
              type={type}
              position={pos}
              id={conn.id}
              key={conn.id}
              className="handle"
            />
            <img
              src={GetConnectorIcon(conn.terminal)}
              alt="icon"
              className="icon"
            />
          </HandleBox>
        );
      })}
    </>
  );
};

export default HandleComponent;
