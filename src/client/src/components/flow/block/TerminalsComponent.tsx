import red from "../../../redux/store";
import { Connector, Aspect } from "../../../models";
import { FilterTerminals } from "../helpers/block";
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
  let sortedList = FilterTerminals(list, aspect);

  if (!splitView) {
    if (aspect === Aspect.Function)
      sortedList = sortedList.filter((x) => !IsLocationTerminal(x));
  }

  return (
    <TerminalsBox visible={isOpen} width={width}>
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
