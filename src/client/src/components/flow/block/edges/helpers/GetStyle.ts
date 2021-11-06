import { Connector } from "../../../../../models";

const GetStyle = (fromConnector: Connector, visible: boolean) => {
  return {
    stroke: fromConnector?.color,
    strokeWidth: 2,
    opacity: visible ? "1" : "0",
    transition: "opacity 500ms",
  };
};

export default GetStyle;
