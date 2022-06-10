import { TerminalsMenuComponent } from "../../../terminals/TerminalsMenuComponent";
import { NodeBoxHeader, BlockNodeNameBox } from "./BlockChildHeader.styled";
import { Tooltip } from "../../../../../../compLibrary/tooltip/Tooltip";
import { useIsOverflowing } from "../../../../../../hooks/useIsOverflowing";
import { Node, Connector } from "@mimirorg/modelbuilder-types";

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
export const BlockChildHeader = ({ node, inputTerminals, outputTerminals, onConnectorClick, showMenuButton }: Props) => {
  const { overflowRef, isOverflowing } = useIsOverflowing<HTMLParagraphElement>();
  const name = node.label ?? node.name;

  return (
    <NodeBoxHeader>
      <TerminalsMenuComponent
        node={node}
        terminals={inputTerminals}
        onClick={(c, isInput) => onConnectorClick(c, isInput)}
        showMenuButton={showMenuButton}
        isInput
      />
      <Tooltip content={name} disabled={!isOverflowing} offset={[0, 10]}>
        <BlockNodeNameBox tabIndex={isOverflowing ? 0 : undefined} ref={overflowRef}>
          {name}
        </BlockNodeNameBox>
      </Tooltip>
      <TerminalsMenuComponent
        node={node}
        terminals={outputTerminals}
        onClick={(c, isInput) => onConnectorClick(c, isInput)}
        showMenuButton={showMenuButton}
      />
    </NodeBoxHeader>
  );
};
