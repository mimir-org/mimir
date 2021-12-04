import { StartPageBackground } from "./styled/";
import { MimirLogo } from "../../assets/icons/mimir";
import { TextResources } from "../../assets/text";

/**
 * The start page for Mimir
 * @returns a splash page with Mimir logo
 */
const StartPage = () => (
  <StartPageBackground>
    <div className="slider">
      <img src={MimirLogo} alt="mimir-logo" className="logo" />
      <p className="version-text">{TextResources.Mimir_Version}</p>
    </div>
  </StartPageBackground>
);

export default StartPage;
