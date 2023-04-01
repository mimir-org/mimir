import { PlusIcon } from "../../../../../assets/icons/controls";
import { TerminalAddRemoveIconBox } from "./TerminalsMenuElement.styled";
import { Direction } from "../../../../../lib/enums/Direction";

interface Props {
  color: string;
  typeId: string;
  nodeId: string;
  direction: Direction;
  onClick: (typeId: string, nodeId: string, direction: Direction) => void;
}

export const AddTerminalComponent = ({ color, typeId, nodeId, direction, onClick }: Props) => {
  return (
    <TerminalAddRemoveIconBox onClick={() => onClick(typeId, nodeId, direction)}>
      <PlusIcon style={{ fill: color }} />
    </TerminalAddRemoveIconBox>
  );
};
