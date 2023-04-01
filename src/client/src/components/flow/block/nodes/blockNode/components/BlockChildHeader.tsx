import { TerminalsMenuComponent } from "../../../terminals/TerminalsMenuComponent";
import { NodeBoxHeader, BlockNodeNameBox } from "./BlockChildHeader.styled";
import { Tooltip } from "../../../../../../compLibrary/tooltip/Tooltip";
import { useIsOverflowing } from "../../../../../../hooks/useIsOverflowing";
import { AspectObject, Connector, Direction } from "lib";

interface Props {
  node: AspectObject;
  inputConnectors: Connector[];
  outputConnectors: Connector[];
  onConnectorClick: (conn: Connector, isInput: boolean, node: AspectObject, isElectroView: boolean) => void;
  isElectroView: boolean;
  showMenuButton?: boolean;
  onClickAddTerminal: (typeId: string, nodeId: string, direction: Direction) => void;
  onClickRemoveTerminal: (nodeId: string, terminalId: string) => void;
}

/**
 * Component for the top banner menu on a ChildNode in BlockView.
 * @returns a banner with terminal menus and name.
 */
export const BlockChildHeader = ({
  node,
  inputConnectors,
  outputConnectors,
  onConnectorClick,
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
        onClick={(c, isInput, node, isElectroView) => onConnectorClick(c, isInput, node, isElectroView)}
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
        onClick={(c, isInput, node, isElectroView) => onConnectorClick(c, isInput, node, isElectroView)}
        showMenuButton={showMenuButton}
        isElectroView={isElectroView}
        isInput={false}
        onClickAddTerminal={onClickAddTerminal}
        onClickRemoveTerminal={onClickRemoveTerminal}
      />
    </NodeBoxHeader>
  );
};
