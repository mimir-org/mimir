import { Handle, Position } from "react-flow-renderer";

const DefaultInputConnect = (inputConnectors, onConnect) => {
  let inputTop = -5;

  return (
    inputConnectors &&
    inputConnectors.length > 0 &&
    inputConnectors.map((connector) => {
      inputTop += 15;
      return (
        <Handle
          type="target"
          position={Position.Left}
          style={{ top: inputTop, bottom: "auto" }}
          id={connector.id}
          key={connector.id}
          onConnect={onConnect}
        >
          <label>{connector.label}</label>
        </Handle>
      );
    })
  );
};
export default DefaultInputConnect;
