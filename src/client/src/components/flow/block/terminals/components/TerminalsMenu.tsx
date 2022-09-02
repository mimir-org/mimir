import { GetAspectColor } from "../../../../../helpers";
import { AspectColorType } from "../../../../../models";
import { SetTerminalsMenuOffset } from "../helpers/SetTerminalsMenuOffset";
import { TerminalsBox } from "./TerminalsMenu.styled";
import { electroSelector, useAppSelector } from "../../../../../redux/store";
import { TerminalsMenuElement } from "./TerminalsMenuElement";
import { Connector, Node } from "@mimirorg/modelbuilder-types";

interface Props {
  node: Node;
  isInput?: boolean;
  connectors: Connector[];
  hasActiveTerminals: boolean;
  isParent: boolean;
  onClick: (conn: Connector, isInput: boolean) => void;
  onBlur: () => void;
}

/**
 * Component for the drop-down menu of terminals.
 * @param interface
 * @returns a drop-down menu with a node's input or output terminals.
 */
export const TerminalsMenu = ({ node, isInput, connectors, hasActiveTerminals, isParent, onClick, onBlur }: Props) => {
  const isElectroViewEnabled = useAppSelector(electroSelector);
  const menuOffset = SetTerminalsMenuOffset(isElectroViewEnabled, hasActiveTerminals, isParent);

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
        <TerminalsMenuElement key={conn.id} conn={conn} isInput={isInput} onClick={onClick} />
      ))}
    </TerminalsBox>
  );
};
