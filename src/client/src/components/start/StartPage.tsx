import { StartPageBackground, StartPageImage, StartPageVersion } from "./StartPage.styled";
import { MimirLogo } from "../../assets/icons/mimir";
import { changeActiveMenu } from "../menus/projectMenu/components/subMenus/redux/menuSlice";
import { IsReleaseVersion } from "./helpers/IsReleaseVersion";
import config from "../../lib/config/config";
import { useEffect } from "react";
import { Dispatch } from "redux";
import { MENU_TYPE } from "../../lib/types/enums/MenuTypes";

/**
 * The start page for Mimir.
 * @returns a splash page with the Mimir logo.
 */
export default function StartPage(dispatch: Dispatch) {
  const version = IsReleaseVersion() ? `Version ${config.MIMIR_VERSION} ` : `Development Version ${config.MIMIR_VERSION}`;

  useEffect(() => {
    dispatch(changeActiveMenu(MENU_TYPE.OPEN_PROJECT_MENU));
  }, []);

  return (
    <StartPageBackground>
      <StartPageImage src={MimirLogo} alt="mimir-logo" />
      <StartPageVersion>
        <div>{version}</div>
      </StartPageVersion>
    </StartPageBackground>
  );
}
