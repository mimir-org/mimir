import { Connector } from "../../../../models";
import { GetConnectorIcon } from "../../helpers/common";
import { SetTerminalsMenuPosition } from "./helpers";
import { TerminalsMenu, TerminalsElement } from "./styled";

interface Props {
  width: number;
  isParent: boolean;
  isLocation: boolean;
  isInput: boolean;
  splitView: boolean;
  terminals: Connector[];
  onClick: (conn: Connector) => void;
}

/**
 * Component for the drop-down menu of terminals.
 * @param param0
 * @returns a drop-down menu with a nodes' input or output terminals.
 */
const TerminalsMenuComponent = ({
  width,
  isParent,
  isLocation,
  isInput,
  splitView,
  terminals,
  onClick,
}: Props) => (
  <TerminalsMenu
    splitView={splitView}
    isParent={isParent}
    isLocation={isLocation}
    isInput={isInput}
    position={SetTerminalsMenuPosition(splitView, isParent, isInput)}
    width={width}
  >
    {terminals.map((conn) => (
      <TerminalsElement key={conn.id}>
        <p className="text">
          {conn.name} {conn.type}
        </p>
        <label className={"checkbox-block"}>
          <input
            type="checkbox"
            checked={conn.visible}
            onChange={() => onClick(conn)}
          />
          <span className="checkmark-block"></span>
        </label>
        <img src={GetConnectorIcon(conn.color)} alt="icon" className="button" />
      </TerminalsElement>
    ))}
  </TerminalsMenu>
);

export default TerminalsMenuComponent;
