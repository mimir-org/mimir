import { Position } from "react-flow-renderer";
import { Size } from "../../../../../compLibrary/size";

const SetPartOfXPos = (pos: Position, isElectro: boolean) => {
  if (isElectro) return "10px";
  if (pos === Position.Bottom) return "-95px";
  return Size.Node_Height + "px";
};

export default SetPartOfXPos;
