import red from "../redux/store";

const GetSelectedBlockNode = () => {
  const nodes = red.store.getState().projectState?.project?.nodes;
  return nodes?.find((node) => node?.isBlockSelected);
};

export default GetSelectedBlockNode;
