import { Node, Connector, Aspect } from "../../../models";
import { GetConnectorIcon, GetConnectorName } from "../helpers/common";
import { FilterTerminals } from "../helpers/block";
import { TerminalsBox, TerminalsElement } from "../../../compLibrary/blockView";

interface Props {
  isOpen: boolean;
  list: (Node | Connector)[];
  type?: Aspect;
  width?: number;
  onClick: any;
}

const TerminalsComponent = ({ isOpen, list, type, width, onClick }: Props) => {
  let sortedList = FilterTerminals(list, type);

  return (
    <TerminalsBox visible={isOpen} type={type} width={width}>
      {sortedList.map((conn) => (
        <TerminalsElement key={conn.id} onClick={() => onClick(conn)}>
          <p className="text"> {GetConnectorName(conn)}</p>
          <img
            src={GetConnectorIcon(conn.color)}
            alt="icon"
            className="button"
          />
        </TerminalsElement>
      ))}
    </TerminalsBox>
  );
};

export default TerminalsComponent;
