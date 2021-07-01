import red from "../../../../../redux/store";

const IsConnectView = () => {
  const mainConnectNodes = red.store.getState().connectView.mainNodes ?? [];
  return mainConnectNodes.length > 0;
};

export default IsConnectView;
