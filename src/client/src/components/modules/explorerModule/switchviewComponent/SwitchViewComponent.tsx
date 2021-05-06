import CombinedViewOffIcon from "../../../../assets/icons/combinedViewOffIcon.svg";
import SplitViewIcon from "../../../../assets/icons/splitViewIcon.svg";
import { FooterBox, FooterContent } from "../../../../componentLibrary";
import textResources from "../../../../textResources";

export const SwitchViewComponent = () => {
  return (
    <>
      <FooterBox>
        <FooterContent>
          <img src={CombinedViewOffIcon} alt="view-icon" />
          <p>{textResources.Combined_view}</p>
        </FooterContent>
        <FooterContent>
          <img src={SplitViewIcon} alt="view-icon" />
          <p>{textResources.Split_view}</p>
        </FooterContent>
      </FooterBox>
    </>
  );
};

export default SwitchViewComponent;
