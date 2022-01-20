import { TerminalsMenuComponent } from "../../terminals";
import { BlockNodeNameBox } from "../../logo/styled";
import { NodeBoxHeader } from "./styled";
import { Connector, Node } from "../../../../../models";

interface Props {
  node: Node;
  inputTerminals: Connector[];
  outputTerminals: Connector[];
  onConnectorClick: (conn: Connector, isInput: boolean) => void;
  showMenuButton?: boolean;
}

/**
 * Component for the top banner menu on a ChildNode in BlockView.
 * @returns a banner with terminal menus and name.
 */
const BlockChildHeader = ({ node, inputTerminals, outputTerminals, onConnectorClick, showMenuButton }: Props) => (
  <NodeBoxHeader>
    <TerminalsMenuComponent
      node={node}
      terminals={inputTerminals}
      onClick={(c, isInput) => onConnectorClick(c, isInput)}
      showMenuButton={showMenuButton}
      isInput
    />
    <BlockNodeNameBox>{node.label ?? node.name}</BlockNodeNameBox>
    <TerminalsMenuComponent
      node={node}
      terminals={outputTerminals}
      onClick={(c, isInput) => onConnectorClick(c, isInput)}
      showMenuButton={showMenuButton}
    />
  </NodeBoxHeader>
);

export default BlockChildHeader;
