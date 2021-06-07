import { Node, Connector, TERMINAL } from "../../../models/project";
import {
  GetConnectorIcon,
  GetConnectorName,
  SortConnectors,
} from "../helpers/common";
import {
  TerminalsBox,
  TerminalsElement,
} from "../../../componentLibrary/blockView";

interface Props {
  isOpen: boolean;
  list: (Node | Connector)[];
  type?: typeof TERMINAL;
  handleClick: any;
  isChecked?: any;
  width?: number;
}

const TerminalsComponent = ({ isOpen, list, width, handleClick }: Props) => {
  return (
    <TerminalsBox visible={isOpen} type={TERMINAL} width={width}>
      {SortConnectors(list).map((conn: Connector) => (
        <TerminalsElement
          type={TERMINAL}
          key={conn.id}
          onClick={() => handleClick(conn)}
        >
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
