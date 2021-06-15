import { Connector, Node } from "../../../models/project";
import { HandleBox } from "../../../componentLibrary/blockView";
import { GetBlockHandleType } from "../helpers/block";
import { Handle } from "react-flow-renderer";
import { Position } from "react-flow-renderer";
import {
  GetConnectorIcon,
  GetHandlePosition,
  IsLocationNode,
  SortConnectors,
  SortLocationConnectors,
} from "../helpers/common";

interface Props {
  data: Node;
}

const HandleComponent = ({ data }: Props) => {
  let sortedTerminals: Connector[] = [];

  IsLocationNode(data)
    ? (sortedTerminals = SortLocationConnectors(data.connectors))
    : (sortedTerminals = SortConnectors(data.connectors));

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
              className={
                pos === Position.Right
                  ? "react-flow__handle-right"
                  : "react-flow__handle-left"
              }
            />
          </HandleBox>
        );
      })}
    </>
  );
};

export default HandleComponent;
