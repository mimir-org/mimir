import { SplitViewIcon, CombinedViewOffIcon } from "../../../assets/index";
import { FooterBox, FooterContent } from "../../../componentLibrary";
import textResources from "../../../textResources";

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
