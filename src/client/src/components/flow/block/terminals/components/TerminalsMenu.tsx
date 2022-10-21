import { GetAspectColor } from "../../../../../helpers";
import { AspectColorType } from "../../../../../models";
import { SetTerminalsMenuOffset } from "../helpers/SetTerminalsMenuOffset";
import { TerminalsBox } from "./TerminalsMenu.styled";
import { electroViewSelector, useAppSelector } from "../../../../../redux/store";
import { TerminalsMenuElement } from "./TerminalsMenuElement";
import { Connector, Node } from "@mimirorg/modelbuilder-types";

interface Props {
  node: Node;
  isInput: boolean;
  connectors: Connector[];
  hasActiveTerminals: boolean;
  isParent: boolean;
  isElectroView: boolean;
  onClick: (conn: Connector, isInput: boolean, node: Node, isElectroView: boolean) => void;
  onBlur: () => void;
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
}: Props) => {
  const isElectroViewEnabled = useAppSelector(electroViewSelector);
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
        <TerminalsMenuElement
          key={conn.id}
          connector={conn}
          isInput={isInput}
          node={node}
          isElectroView={isElectroView}
          onClick={onClick}
        />
      ))}
    </TerminalsBox>
  );
};
