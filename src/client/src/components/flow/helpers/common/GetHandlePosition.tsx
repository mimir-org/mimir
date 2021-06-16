import { Position } from "react-flow-renderer";

const GetHandlePosition = (position: Position) => {
  if (position === Position.Right) return "right";
  if (position === Position.Left) return "left";
  if (position === Position.Top) return "top";
  if (position === Position.Bottom) return "bottom";
};

export default GetHandlePosition;
