import red from "../redux/store";

const GetSelectedNode = () => {
  const nodes = red.store.getState().projectState?.project?.nodes;
  return nodes?.find((node) => node?.isSelected);
};

export default GetSelectedNode;
