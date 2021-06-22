import red from "../../../redux/store";
import { Node } from "../../../models";
import { ArrowIcon } from "../../../assets/icons/blockView";
import { BlockNodeBox } from "../../../compLibrary/blockView";

const Block = ({ data, location, splitView }) => {
  const nodes = red.store.getState().projectState.project.nodes as Node[];
  const node = nodes.find((x) => x.id === data.id);

  return (
    <BlockNodeBox
      id={"function-block-" + data.id}
      location={location}
      splitView={splitView}
      selected={node.isBlockSelected}
    >
      <img src={ArrowIcon} alt="arrow" className="icon"></img>
      <h3 className="header">{data.label}</h3>
      <div className="line" />
      <div className="content"></div>
    </BlockNodeBox>
  );
};

export default Block;
