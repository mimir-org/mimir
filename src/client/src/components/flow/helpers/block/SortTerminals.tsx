import { Connector } from "../../../../models";
import { IsInputTerminal, IsOutputTerminal } from "../common";

const SortTerminals = (connectorList: Connector[]) => {
  connectorList.sort((a: Connector, b: Connector) => {
    if (a.type < b.type) return -1;
    if (a.type > b.type) return 1;
    if (IsInputTerminal(a) && IsInputTerminal(b) && a.name < b.name) return -1;
    if (IsInputTerminal(a) && IsInputTerminal(b) && a.name > b.name) return 1;
    if (IsOutputTerminal(a) && IsOutputTerminal(b) && a.name < b.name)
      return -1;
    if (IsOutputTerminal(a) && IsOutputTerminal(b) && a.name > b.name) return 1;

    return 0;
  });

  return connectorList;
};

export default SortTerminals;
