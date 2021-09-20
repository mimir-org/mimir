import { Connector } from "../../../models";
import { TerminalsBox, TerminalsElement } from "../../../compLibrary/blockView";
import { GetConnectorIcon, GetConnectorName } from "../helpers/common";

interface Props {
  isOpen: boolean;
  list: Connector[];
  width: number;
  isParent: boolean;
  onClick: (conn: Connector) => void;
}

const TerminalsMenuComponent = ({
  isOpen,
  list,
  width,
  isParent,
  onClick,
}: Props) => (
  <TerminalsBox visible={isOpen} width={width} isParent={isParent}>
    {list.map((conn) => (
      <TerminalsElement key={conn.id} onClick={() => onClick(conn)}>
        <p className="text"> {GetConnectorName(conn)}</p>
        <img src={GetConnectorIcon(conn.color)} alt="icon" className="button" />
      </TerminalsElement>
    ))}
  </TerminalsBox>
);
export default TerminalsMenuComponent;
