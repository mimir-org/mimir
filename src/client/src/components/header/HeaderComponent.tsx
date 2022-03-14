import Config from "../../models/Config";
import ToolbarComponent from "../toolbar/ToolbarComponent";
import { MimirLogo } from "../../assets/icons/mimir";
import { AvatarComponent } from "./components/AvatarComponent";
import { ProjectMenuHeaderComponent } from "./components/ProjectMenuHeaderComponent";
import { CompanyLogoBox, HeaderBox, LogoBox, HeaderRightSection } from "./HeaderComponent.styled";
import { GetCompanyLogoForHeader, IsBlockView, IsStartPage } from "../../helpers";
import { useZoomPanHelper } from "react-flow-renderer";
import { secondaryNodeSelector, useAppSelector } from "../../redux/store";
import { SetZoomCenterLevel } from "../flow/block/nodes/blockParentNode/helpers/SetZoomCenterLevel";

/**
 * The top header in Mimir.
 * @returns a banner with the Mimir and company logo, and buttons for project/user menus.
 */
export const HeaderComponent = () => {
  const { setCenter } = useZoomPanHelper();
  const secondaryNode = useAppSelector(secondaryNodeSelector);

  const onResetZoom = () => {
    if (!IsBlockView()) return;
    const canvasData = SetZoomCenterLevel(secondaryNode !== null);
    setCenter(canvasData.x, canvasData.y, canvasData.zoom);
  };

  return (
    <>
      <HeaderBox id="Header">
        <LogoBox>
          <img src={MimirLogo} alt="mimir logo" onClick={() => onResetZoom()} />
        </LogoBox>
        <HeaderRightSection>
          <ProjectMenuHeaderComponent />
          <CompanyLogoBox>
            <img src={GetCompanyLogoForHeader(Config.COMPANY)} alt="company logo" />
          </CompanyLogoBox>
          <AvatarComponent />
        </HeaderRightSection>
      </HeaderBox>
      {!IsStartPage() && <ToolbarComponent />}
    </>
  );
};
