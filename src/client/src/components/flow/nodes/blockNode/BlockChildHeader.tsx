import { TerminalsMenuComponent } from "components/flow/terminals/TerminalsMenuComponent";
import { NodeBoxHeader, BlockNodeNameBox } from "./BlockNode.styled";
import { Tooltip } from "compLibrary/tooltip/Tooltip";
import { useIsOverflowing } from "hooks/useIsOverflowing";
import { Block, Connector } from "lib";

interface Props {
  node: Block;
  inputConnectors: Connector[];
  outputConnectors: Connector[];
  onClickTerminalChecked: (terminalId: string, checked: boolean) => void;
  isElectroView: boolean;
  showMenuButton?: boolean;
  onClickAddTerminal: (terminalId: string) => void;
  onClickRemoveTerminal: (terminalId: string) => void;
}

/**
 * Component for the top banner menu on a ChildNode in BlockView.
 * @returns a banner with terminal menus and name.
 */
export const BlockChildHeader = ({
  node,
  inputConnectors,
  outputConnectors,
  onClickTerminalChecked,
  isElectroView,
  showMenuButton,
  onClickAddTerminal,
  onClickRemoveTerminal,
}: Props) => {
  const { overflowRef, isOverflowing } = useIsOverflowing<HTMLParagraphElement>();
  const name = node.label ?? node.name;

  return (
    <NodeBoxHeader>
      <TerminalsMenuComponent
        node={node}
        connectors={inputConnectors}
        onClick={(c) => onClickTerminalChecked(c.id, !c.selected)}
        showMenuButton={showMenuButton}
        isElectroView={isElectroView}
        isInput
        onClickAddTerminal={onClickAddTerminal}
        onClickRemoveTerminal={onClickRemoveTerminal}
      />
      <Tooltip content={name} disabled={!isOverflowing} offset={[0, 10]}>
        <BlockNodeNameBox tabIndex={isOverflowing ? 0 : undefined} ref={overflowRef}>
          {name}
        </BlockNodeNameBox>
      </Tooltip>
      <TerminalsMenuComponent
        node={node}
        connectors={outputConnectors}
        onClick={(c) => onClickTerminalChecked(c.id, !c.selected)}
        showMenuButton={showMenuButton}
        isElectroView={isElectroView}
        isInput={false}
        onClickAddTerminal={onClickAddTerminal}
        onClickRemoveTerminal={onClickRemoveTerminal}
      />
    </NodeBoxHeader>
  );
};
