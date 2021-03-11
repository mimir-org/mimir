import { Handle, Position } from "react-flow-renderer";

const OutputConnect = (outputConnectors) => {
  let outputTop = -5;

  return (
    outputConnectors &&
    outputConnectors.length > 0 &&
    outputConnectors.map((connector) => {
      outputTop += 15;
      return (
        <Handle
          type="source"
          position={Position.Right}
          style={{ top: outputTop, bottom: "auto" }}
          id={connector.id}
          key={connector.id}
        >
          <label>{connector.label}</label>
        </Handle>
      );
    })
  );
};

export default OutputConnect;
