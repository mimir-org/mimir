import { ArrowIcon } from "../../../assets/icons/blockView";
import { BlockParentBox } from "../../../compLibrary/blockView";

const Block = ({ data, isLocation, isSplitView, isSelected }) => (
  <BlockParentBox
    id={"function-block-" + data.id}
    location={isLocation}
    splitView={isSplitView}
    selected={isSelected}
  >
    <img src={ArrowIcon} alt="arrow" className="icon"></img>
    <h3 className="header">{data.label ?? data.name}</h3>
    <div className="line" />
    <div className="content"></div>
  </BlockParentBox>
);

export default Block;
