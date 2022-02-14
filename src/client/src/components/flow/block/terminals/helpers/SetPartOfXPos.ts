import { Position } from "react-flow-renderer";

const SetPartOfXPos = (pos: Position, isElectro: boolean) => {
  if (isElectro) {
    if (pos === Position.Left) return "-85px";
    if (pos === Position.Right) return "65px";
  }
  if (pos === Position.Bottom) return "-105px";
  if (pos === Position.Top) return "85px";
};

export default SetPartOfXPos;
