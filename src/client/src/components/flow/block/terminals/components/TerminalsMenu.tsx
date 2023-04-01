import { GetAspectColor } from "../../../../../helpers";
import { AspectColorType } from "../../../../../models";
import { SetTerminalsMenuOffset } from "../helpers/SetTerminalsMenuOffset";
import { TerminalsBox } from "./TerminalsMenu.styled";
import { TerminalsMenuElement } from "./TerminalsMenuElement";
import { AspectObject, Connector, Direction } from "lib";

interface Props {
  node: AspectObject;
  isInput: boolean;
  connectors: Connector[];
  hasActiveTerminals: boolean;
  isParent: boolean;
  isElectroView: boolean;
  onClick: (conn: Connector, isInput: boolean, node: AspectObject, isElectroView: boolean) => void;
  onBlur: () => void;
  onClickAddTerminal: (typeId: string, nodeId: string, direction: Direction) => void;
  onClickRemoveTerminal: (nodeId: string, terminalId: string) => void;
}

/**
 * Component for the drop-down menu of terminals.
 * @param interface
 * @returns a drop-down menu with a node's input or output terminals.
 */
export const TerminalsMenu = ({
  node,
  isInput,
  connectors,
  hasActiveTerminals,
  isParent,
  isElectroView,
  onClick,
  onBlur,
  onClickAddTerminal,
  onClickRemoveTerminal,
}: Props) => {
  const menuOffset = SetTerminalsMenuOffset(false, hasActiveTerminals, isParent);

  return (
    <TerminalsBox
      id={`terminals-dropdown-${node.id}`}
      tabIndex={0}
      onBlur={onBlur}
      color={GetAspectColor(node, AspectColorType.Selected)}
      isInput={isInput}
      menuOffset={menuOffset}
    >
      {connectors.map((conn) => (
        <TerminalsMenuElement
          key={conn.id}
          connector={conn}
          isInput={isInput}
          node={node}
          isElectroView={isElectroView}
          onClick={onClick}
          onClickAddTerminal={onClickAddTerminal}
          onClickRemoveTerminal={onClickRemoveTerminal}
        />
      ))}
    </TerminalsBox>
  );
};
