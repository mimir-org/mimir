import red from "../../../redux/store";
import { Connector, Aspect } from "../../../models";
import { TerminalsBox, TerminalsElement } from "../../../compLibrary/blockView";
import {
  GetConnectorIcon,
  GetConnectorName,
  IsLocationTerminal,
} from "../helpers/common";

interface Props {
  isOpen: boolean;
  list: Connector[];
  aspect: Aspect;
  width: number;
  onClick: (conn: Connector) => void;
}

const TerminalsComponent = ({
  isOpen,
  list,
  aspect,
  width,
  onClick,
}: Props) => {
  const splitView = red.store.getState().splitView.visible as boolean;
  if (!splitView) {
    if (aspect === Aspect.Function)
      list = list.filter((x) => !IsLocationTerminal(x));
  }

  return (
    <TerminalsBox visible={isOpen} width={width}>
      {list.map((conn) => (
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
