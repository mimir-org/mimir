import { MiniMap } from "react-flow-renderer";
import { GetColor } from "../../assets/helpers";

const MiniMapComponent = () => {
  return (
    <MiniMap
      nodeStrokeColor={(node: any) => {
        return GetColor(node.type);
      }}
      nodeColor={(node: any) => {
        return GetColor(node.type);
      }}
    />
  );
};

export default MiniMapComponent;
