import { Node } from "../../../models/project";
import { HandleBox } from "../../../componentLibrary/blockView";
import { FilterConnectors, GetBlockHandleType } from "../helpers/block";
import { Handle } from "react-flow-renderer";
import { GetConnectorIcon, GetHandlePosition } from "../helpers/common";

interface Props {
  data: Node;
}

const HandleComponent = ({ data }: Props) => {
  let sortedTerminals = FilterConnectors(data.connectors, data.type);
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
            visible={true} // TODO: fix
            icon={GetConnectorIcon(conn.terminal)}
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
