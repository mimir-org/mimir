import { Connector } from "../../../models";
import { TerminalsBox, TerminalsElement } from "../../../compLibrary/blockView";
import { GetConnectorIcon, GetConnectorName } from "../helpers/common";

/** Component for the terminals menu. This is the menu in the upper-right corner of a node
 *  The component returns a drop-down menu where you can select from the nodes' terminals
 */

interface Props {
  isOpen: boolean;
  list: Connector[];
  width: number;
  isParent: boolean;
  isLocation: boolean;
  onClick: (conn: Connector) => void;
}

const TerminalsMenuComponent = ({
  isOpen,
  list,
  width,
  isParent,
  isLocation,
  onClick,
}: Props) => (
  <TerminalsBox
    visible={isOpen}
    width={width}
    isParent={isParent}
    isLocation={isLocation}
  >
    {list.map((conn) => (
      <TerminalsElement key={conn.id}>
        <p className="text"> {GetConnectorName(conn)}</p>
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
  </TerminalsBox>
);
export default TerminalsMenuComponent;
