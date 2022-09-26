import * as icons from "../../../../../../assets/icons/offpage";
import { Connector } from "@mimirorg/modelbuilder-types";

/**
 * Component to get the correct icon for an OffPageNode.
 * @param offPageTerminal
 * @param sourceTerminal
 * @param isElectroView
 * @returns an icon.
 */
const GetOffPageIcon = (offPageTerminal: Connector, sourceTerminal: Connector, isElectroView: boolean) => {
  if (isElectroView) return GetOffPageVerticalIcon(sourceTerminal);

  if (sourceTerminal?.isRequired) return icons.OffPageRequiredIcon;
  return icons.OffPageConnectedIcon;
};

function GetOffPageVerticalIcon(sourceTerminal: Connector) {
  if (sourceTerminal?.isRequired) return icons.OffPageRequiredVerticalIcon;
  return icons.OffPageConnectedIcon;
}

export default GetOffPageIcon;
