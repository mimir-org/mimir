import { IsAspectNode } from "../../../../helpers";
import { GetMenuIcon } from "./helpers";
import { TerminalsButton } from "./styled";
import { Connector, Node } from "../../../../models";

interface Props {
  node: Node;
  isParent: boolean;
  isInput: boolean;
  showMenuBox: boolean;
  terminals: Connector[];
  onClick: () => void;
}

/**
 * Component for the MenuBox that displays the drop-down menu for terminals.
 * @param interface
 * @returns a clickable box.
 */
const TerminalsMenuBox = ({ node, isParent, isInput, showMenuBox, terminals, onClick }: Props) => (
  <TerminalsButton visible={showMenuBox && !IsAspectNode(node) && !!terminals.length} parent={isParent} input={isInput}>
    <img src={GetMenuIcon(node, isParent, isInput)} alt="menu" onClick={() => onClick()} />
  </TerminalsButton>
);

export default TerminalsMenuBox;
