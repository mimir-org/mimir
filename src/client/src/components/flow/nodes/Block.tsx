import red from "../../../redux/store";
import { Node } from "../../../models";
import { ArrowIcon } from "../../../assets/icons/blockView";
import { BlockParentBox } from "../../../compLibrary/blockView";

const Block = ({ data, location, splitView }) => {
  const nodes = red.store.getState().projectState.project.nodes as Node[];
  const node = nodes.find((x) => x.id === data.id);

  return (
    <BlockParentBox
      id={"function-block-" + data.id}
      location={location}
      splitView={splitView}
      selected={node?.isBlockSelected}
    >
      <img src={ArrowIcon} alt="arrow" className="icon"></img>
      <h3 className="header">{data.label ?? data.name}</h3>
      <div className="line" />
      <div className="content"></div>
    </BlockParentBox>
  );
};

export default Block;
