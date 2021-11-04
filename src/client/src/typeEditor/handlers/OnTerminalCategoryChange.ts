import { Dispatch } from "redux";
import { TerminalTypeItem, ConnectorType } from "../../models";
import { TerminalCategoryChangeKey } from "../types";
import {
  addTerminalType,
  removeTerminalType,
  updateTerminalType,
  removeTerminalTypeByCategory,
  updateValue,
} from "../redux/actions";

export const OnTerminalCategoryChange = (
  key: TerminalCategoryChangeKey,
  terminalTypeItem: TerminalTypeItem,
  dispatch: Dispatch
) => {
  if (key === "add") {
    dispatch(addTerminalType(terminalTypeItem));
  } else if (key === "remove") {
    dispatch(removeTerminalType(terminalTypeItem));
  } else if (key === "update") {
    dispatch(updateTerminalType(terminalTypeItem));
  } else if (key === "removeAll") {
    dispatch(removeTerminalTypeByCategory(terminalTypeItem.categoryId));
  } else if (key === "terminalTypeId") {
    dispatch(removeTerminalTypeByCategory(terminalTypeItem.categoryId));
    dispatch(addTerminalType({ ...terminalTypeItem, connectorType: ConnectorType.Input }));
    dispatch(addTerminalType({ ...terminalTypeItem, connectorType: ConnectorType.Output }));
    dispatch(updateValue(key, terminalTypeItem.terminalTypeId));
  }
};
