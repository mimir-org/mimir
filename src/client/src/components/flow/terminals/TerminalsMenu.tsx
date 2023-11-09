import { TerminalsMenuElement } from "./TerminalsMenuElement";
import { Block, Connector } from "lib";
import { TerminalsBox } from "components/flow/terminals/TerminalsMenuComponent.styled";

interface Props {
  node: Block;
  isInput: boolean;
  connectors: Connector[];
  hasActiveTerminals: boolean;
  isParent: boolean;
  isElectroView: boolean;
  onClick: (conn: Connector, isInput: boolean, node: Block, isElectroView: boolean) => void;
  onBlur: () => void;
  onClickAddTerminal: (terminalId: string) => void;
  onClickRemoveTerminal: (terminalId: string) => void;
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
      color={node.aspectColor.selectedColor}
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

const SetTerminalsMenuOffset = (isElectroView: boolean, hasActiveTerminals: boolean, isParent: boolean) => {
  if (isParent) return "16px";
  if (!isElectroView && hasActiveTerminals) return "25px";
  return "8px";
};
