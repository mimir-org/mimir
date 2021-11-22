import { TerminalTypeItem } from "../../models";

/* Component that checks the count of each terminalType. 
When creating a Type in TypeEditor only two terminals of each type can be selected. */

const ValidateTerminalType = (terminals: TerminalTypeItem[]) => {
  const result = {};
  let valid = true;

  terminals.forEach((terminal) => {
    result[terminal.terminalTypeId] = (result[terminal.terminalTypeId] || 0) + 1;
  });

  Object.values(result).forEach((value) => {
    if (value > 2) valid = false;
  });

  return valid;
};

export default ValidateTerminalType;
