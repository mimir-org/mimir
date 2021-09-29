import { Connector } from "../../../../models";
import { GetConnectorIcon } from "../../helpers/common";
import { SetTerminalsMenuPosition } from "./helpers";
import { TerminalsMenu, TerminalsElement } from "./styled";

interface Props {
  width: number;
  isParent: boolean;
  isLocation: boolean;
  isInput: boolean;
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
  terminals,
  onClick,
}: Props) => (
  <TerminalsMenu
    width={width}
    isParent={isParent}
    isLocation={isLocation}
    isInput={isInput}
    position={SetTerminalsMenuPosition(false, isParent, isInput)}
  >
    {terminals.map((conn) => (
      <TerminalsElement key={conn.id}>
        <p className="text">{conn.name}</p>
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
