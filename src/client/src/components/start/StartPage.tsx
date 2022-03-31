import { StartPageBackground, StartPageImage } from "./StartPage.styled";
import { MimirLogo } from "../../assets/icons/mimir";
import { useAppDispatch } from "../../redux/store";
import { MENU_TYPE } from "../../models/project";
import { changeActiveMenu } from "../menus/projectMenu/components/subMenus/redux/menuSlice";
import { useEffectOnce } from "../../hooks/useEffectOnce";

/**
 * The start page for Mimir.
 * @returns a splash page with the Mimir logo.
 */
export const StartPage = () => {
  const dispatch = useAppDispatch();

  useEffectOnce(() => {
    dispatch(changeActiveMenu(MENU_TYPE.OPEN_PROJECT_MENU));
  });

  return (
    <StartPageBackground>
      <StartPageImage src={MimirLogo} alt="mimir-logo" />
    </StartPageBackground>
  );
};
