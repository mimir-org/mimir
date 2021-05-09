import { MiniMap } from "react-flow-renderer";
import { GetMapColor } from "../../assets/helpers";

const MiniMapComponent = () => {
  return (
    <MiniMap
      nodeStrokeColor={(node: any) => {
        return GetMapColor(node.type);
      }}
      nodeColor={(node: any) => {
        return GetMapColor(node.type);
      }}
    />
  );
};

export default MiniMapComponent;
