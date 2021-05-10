import { SplitViewIcon, CombinedViewOffIcon } from "../../../assets/icons";
import { FooterBox, FooterContent } from "../../../componentLibrary/box/footer";
import { TextResources } from "../../../assets/textResources";

export const SwitchViewComponent = () => {
  return (
    <>
      <FooterBox>
        <FooterContent>
          <img src={CombinedViewOffIcon} alt="view-icon" />
          <p>{TextResources.Combined_view}</p>
        </FooterContent>
        <FooterContent>
          <img src={SplitViewIcon} alt="view-icon" />
          <p>{TextResources.Split_view}</p>
        </FooterContent>
      </FooterBox>
    </>
  );
};

export default SwitchViewComponent;
