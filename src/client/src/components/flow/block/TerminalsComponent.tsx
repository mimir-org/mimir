import { Node, Connector, NODE_TYPE } from "../../../models/project";
import {
  TerminalsBox,
  TerminalsElement,
} from "../../../componentLibrary/blockView";
import {
  GetConnectorIcon,
  GetConnectorName,
  SortConnectors,
  SortLocationConnectors,
} from "../helpers/common";

interface Props {
  isOpen: boolean;
  list: (Node | Connector)[];
  type?: string;
  width?: number;
  onClick: any;
}

const TerminalsComponent = ({ isOpen, list, type, width, onClick }: Props) => {
  let sortedList = [];

  if (type === NODE_TYPE.LOCATION) sortedList = SortLocationConnectors(list);
  else sortedList = SortConnectors(list);

  return (
    <TerminalsBox visible={isOpen} type={type} width={width}>
      {sortedList.map((conn: Connector) => (
        <TerminalsElement key={conn.id} onClick={() => onClick(conn)}>
          <p className="text"> {GetConnectorName(conn)}</p>

          <img
            src={GetConnectorIcon(conn.terminal)}
            alt="icon"
            className="button"
          />
        </TerminalsElement>
      ))}
    </TerminalsBox>
  );
};

export default TerminalsComponent;
