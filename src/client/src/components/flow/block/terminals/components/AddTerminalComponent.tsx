import { ConnectorDirection } from "@mimirorg/modelbuilder-types";
import { PlusIcon } from "../../../../../assets/icons/controls";
import { TerminalAddRemoveIconBox } from "./TerminalsMenuElement.styled";

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
