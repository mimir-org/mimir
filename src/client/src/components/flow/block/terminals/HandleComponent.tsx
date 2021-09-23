import { Aspect, Connector } from "../../../../models";
import { HandleBox } from "../../../../compLibrary/blockView";
import { Handle } from "react-flow-renderer";
import { GetBlockHandleType } from "../../helpers/block";
import {
  GetConnectorIcon,
  GetHandlePosition,
  IsInputTerminal,
  IsOutputTerminal,
  IsLocationTerminal,
  SetTerminalYPos,
} from "../../helpers/common";

interface Props {
  aspect: Aspect;
  terminals: Connector[];
  splitView: boolean;
  parent: boolean;
}

/**  Components for the terminals displayed on the nodes in BlockView.
 *   The component returns a list of terminals in form of a Flow Handle element.
 */
const HandleComponent = ({ aspect, terminals, splitView, parent }: Props) => {
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
            splitView={splitView}
            isLocation={IsLocationTerminal(conn)}
            parent={parent}
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
              className="react-flow__handle-block"
            />
          </HandleBox>
        );
      })}
    </>
  );
};

export default HandleComponent;
