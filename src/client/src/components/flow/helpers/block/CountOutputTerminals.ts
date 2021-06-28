import { Connector } from "../../../../models";
import { IsInputConnector } from "../common";

const CountOutputTerminals = (terminals: Connector[]) => {
  let count = 0;
  terminals.forEach((terminal) => {
    if (!IsInputConnector(terminal)) count++;
  });

  return count;
};

export default CountOutputTerminals;
