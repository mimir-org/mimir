import { changeActiveConnector } from "../../../../redux/store/project/actions";

const OnInactiveTerminalChange = (activeElements: any[], dispatch: any, visible: boolean) => {
  // Toggle inactive terminals
  activeElements.forEach((elem) => {
    dispatch(changeActiveConnector(elem?.nodeId, elem?.id, !visible, elem?.inputOrder, elem?.outputOrder));
  });
};

export default OnInactiveTerminalChange;
