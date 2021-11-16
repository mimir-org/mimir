import { changeActiveConnector } from "../../../../redux/store/project/actions";

const OnInactiveTerminalChange = (inActiveElements: any[], dispatch: any, visible: boolean) => {
  // Toggle inactive terminals
  inActiveElements.forEach((elem) => {
    dispatch(changeActiveConnector(elem?.nodeId, elem?.id, !visible, elem?.inputOrder, elem?.outputOrder));
  });
};

export default OnInactiveTerminalChange;
