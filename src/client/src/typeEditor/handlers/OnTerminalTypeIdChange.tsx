import { Dispatch } from "redux";
import { clearAllTerminalTypes, updateValue } from "../redux/actions";

const OnTerminalTypeIdChange = (terminalTypeId: string, dispatch: Dispatch) => {
  dispatch(clearAllTerminalTypes());
  dispatch(updateValue("terminalTypeId", terminalTypeId));
};

export default OnTerminalTypeIdChange;
