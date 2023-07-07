import { MinusIcon } from "assets/icons/controls";
import { TerminalAddRemoveIconBox } from "components/flow/terminals/TerminalsMenuComponent.styled";

interface Props {
  color: string;
  terminalId: string;
  nodeId: string;
  onClick: (nodeId: string, terminalId: string) => void;
}

export const RemoveTerminalComponent = ({ color, terminalId, nodeId, onClick }: Props) => {
  return (
    <TerminalAddRemoveIconBox onClick={() => onClick(nodeId, terminalId)}>
      <MinusIcon style={{ fill: color }} />
    </TerminalAddRemoveIconBox>
  );
};
