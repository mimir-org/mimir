import { ArrowIcon } from "../../../assets/icons/blockView";
import { FunctionBox } from "../../../componentLibrary/blockView";

const Block = ({ data, split, location }) => {
  if (split) data = split;

  return (
    <FunctionBox id={"function-block-" + data.id} location={location}>
      <img src={ArrowIcon} alt="arrow" className="icon"></img>
      <h3 className="header">{data.label ?? data.name}</h3>
      <div className="content"></div>
    </FunctionBox>
  );
};

export default Block;
