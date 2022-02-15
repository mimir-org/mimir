import { StartPageBackground, StartPageImage, StartPageSliderContainer, StartPageVersionText } from "./StartPage.styled";
import { MimirLogo } from "../../assets/icons/mimir";
import { TextResources } from "../../assets/text";
import { useAppDispatch } from "../../redux/store";
import { MENU_TYPE } from "../../models/project";
import { changeActiveMenu } from "../menus/projectMenu/components/subMenus/redux/menuSlice";
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
      <StartPageSliderContainer>
        <StartPageImage src={MimirLogo} alt="mimir-logo" />
        <StartPageVersionText>{TextResources.Mimir_Version}</StartPageVersionText>
      </StartPageSliderContainer>
    </StartPageBackground>
  );
};

export default StartPage;
