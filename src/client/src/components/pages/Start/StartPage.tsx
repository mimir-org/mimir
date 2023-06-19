import { StartPageBackground, StartPageImage, StartPageVersion } from "./StartPage.styled";
import { MimirLogo } from "../../../assets/icons/mimir";
import config from "lib/Config";

/**
 * Matches version against expected release format.
 * A proper release (using semantic versioning) should be of the format X.Y.Z, with optional extra characters.
 * Regex: Matches against group of 3 digits, with dot in between, as well as any trailing characters.
 * @example 2.5.0 is valid. 2.4.3-rc1 is valid.
 * @example 2.0 is invalid. dev-aff1231 is invalid.
 */
export const IsReleaseVersion = () => {
  return config.MIMIR_VERSION.match(/(?:\d\.){2}\d.*/) !== null;
};

/**
 * The start page for Mimir.
 * @returns a splash page with the Mimir logo.
 */
export const StartPage = () => {
  const version = IsReleaseVersion() ? `Version ${config.MIMIR_VERSION} ` : `Development Version ${config.MIMIR_VERSION}`;

  return (
    <StartPageBackground>
      <StartPageImage src={MimirLogo} alt="mimir-logo" />
      <StartPageVersion>
        <div>{version}</div>
      </StartPageVersion>
    </StartPageBackground>
  );
};
