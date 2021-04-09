import CombinedViewOffIcon from "../../../../assets/icons/combinedViewOffIcon.svg";
import SplitViewIcon from "../../../../assets/icons/splitViewIcon.svg";
import textResources from "../../../../textResources";
import { SwitchViewWrapper, ViewOptionWrapper } from "../styled";

export const SwitchViewComponent = () => {
  return (
    <>
      <SwitchViewWrapper>
        <ViewOptionWrapper>
          <img src={CombinedViewOffIcon} alt="view-icon" />
          <p>{textResources.Combined_view}</p>
        </ViewOptionWrapper>
        <ViewOptionWrapper>
          <img src={SplitViewIcon} alt="view-icon" />
          <p>{textResources.Split_view}</p>
        </ViewOptionWrapper>
      </SwitchViewWrapper>
    </>
  );
};

export default SwitchViewComponent;
