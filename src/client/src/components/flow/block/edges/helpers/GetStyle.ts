import { Connector } from "../../../../../models";

const GetStyle = (fromConnector: Connector) => {
  return {
    stroke: fromConnector?.color,
    strokeWidth: 2,
  };
};

export default GetStyle;
