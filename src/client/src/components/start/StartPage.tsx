import { StartPageBackground } from "./styled/";
import { MimirLogo } from "../../assets/icons/mimir";
import { TextResources } from "../../assets/text";
import { useAppDispatch } from "../../redux/store";
import { MENU_TYPE } from "../../models/project";
import { changeActiveMenu } from "../menus/projectMenu/subMenus/redux/menuSlice";
import { useEffectOnce } from "../../hooks/useEffectOnce";

/**
 * The start page for Mimir
 * @returns a splash page with Mimir logo
 */
const StartPage = () => {
  const dispatch = useAppDispatch();

  useEffectOnce(() => {
    dispatch(changeActiveMenu(MENU_TYPE.OPEN_PROJECT_MENU));
  });

  return (
    <StartPageBackground>
      <div className="slider">
        <img src={MimirLogo} alt="mimir-logo" className="logo" />
        <p className="version-text">{TextResources.Mimir_Version}</p>
      </div>
    </StartPageBackground>
  );
};

export default StartPage;
