import { PlusIcon } from "../../../assets/icons/controls";
import { ConnectorDirection } from "../../../lib/enums/Direction";
import { TerminalAddRemoveIconBox } from "./TerminalsMenuComponent.styled";

interface Props {
  color: string;
  typeId: string;
  nodeId: string;
  direction: ConnectorDirection;
  onClick: (typeId: string, nodeId: string, direction: ConnectorDirection) => void;
}

export const AddTerminalComponent = ({ color, typeId, nodeId, direction, onClick }: Props) => {
  return (
    <TerminalAddRemoveIconBox onClick={() => onClick(typeId, nodeId, direction)}>
      <PlusIcon style={{ fill: color }} />
    </TerminalAddRemoveIconBox>
  );
};
