import { HandleType, Position } from "react-flow-renderer";

export interface FlowHandle {
  id: string;
  connectorId: string;
  position: Position;
  handleType: HandleType;
  side: "inside" | "outside";
  hidden: boolean;
  className: string;
}
