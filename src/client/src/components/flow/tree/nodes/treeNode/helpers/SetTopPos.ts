import { Position } from "react-flow-renderer";

const SetTopPos = (position: Position) => {
  if (position === Position.Top) return "-20px";
  if (position === Position.Right || position === Position.Left) return "50%";
};

export default SetTopPos;
