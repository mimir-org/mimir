import { Position } from "react-flow-renderer";

const SetPartOfYPos = (pos: Position, isElectro: boolean) => {
  if (isElectro) {
    if (pos === Position.Right) return "-70px";
    if (pos === Position.Left) return "50px";
  }
  if (pos === Position.Bottom) return "30px";
  if (pos === Position.Top) return "-50px";
};

export default SetPartOfYPos;
