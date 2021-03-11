import { Handle, Position } from "react-flow-renderer";

const DataConnect = (data, onConnect) => {
  return (
    data.connectors &&
    data.connectors.length > 0 &&
    data.connectors.map((connector) => {
      const position =
        connector.type === "source" ? Position.Right : Position.Left;

      return (
        <Handle
          type={connector.type}
          position={position}
          className={connector.type}
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

export default DataConnect;
