import red from "../../../../../redux/store";

const IsConnectView = () => {
  const connectNodes = red.store.getState().connectView.mainNodes;
  return connectNodes.length > 0;
};

export default IsConnectView;
