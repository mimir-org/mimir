import { Position } from "react-flow-renderer";

const SetPartOfYPos = (pos: Position, isElectro: boolean) => {
  if (!isElectro) return "-50px";
  if (pos === Position.Right) return "-60px";
  return "60px";
};

export default SetPartOfYPos;
