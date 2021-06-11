import { ArrowIcon } from "../../../assets/icons/blockView";
import { BlockNodeBox } from "../../../componentLibrary/blockView";

const Block = ({ data, location, splitView }) => {
  return (
    <BlockNodeBox
      id={"function-block-" + data.id}
      location={location}
      splitView={splitView}
    >
      <img src={ArrowIcon} alt="arrow" className="icon"></img>
      <h3 className="header">{data.label}</h3>
      <div className="content"></div>
    </BlockNodeBox>
  );
};

export default Block;
