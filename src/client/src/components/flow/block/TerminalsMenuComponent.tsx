import { Connector } from "../../../models";
import { TerminalsBox, TerminalsElement } from "../../../compLibrary/blockView";
import { GetConnectorIcon, GetConnectorName } from "../helpers/common";

interface Props {
  isOpen: boolean;
  list: Connector[];
  width: number;
  onClick: (conn: Connector) => void;
}

const TerminalsMenuComponent = ({ isOpen, list, width, onClick }: Props) => (
  <TerminalsBox visible={isOpen} width={width}>
    {list.map((conn) => (
      <TerminalsElement key={conn.id} onClick={() => onClick(conn)}>
        <p className="text"> {GetConnectorName(conn)}</p>
        <img src={GetConnectorIcon(conn.color)} alt="icon" className="button" />
      </TerminalsElement>
    ))}
  </TerminalsBox>
);
export default TerminalsMenuComponent;
