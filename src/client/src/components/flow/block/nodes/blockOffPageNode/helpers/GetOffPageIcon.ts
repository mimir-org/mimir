import * as icons from "../../../../../../assets/icons/offpage";
import { Connector } from "@mimirorg/modelbuilder-types";
import { IsInputConnector } from "../../../../helpers/Connectors";

/**
 * Component to get the correct icon for an OffPageNode.
 * @param offPageTerminal
 * @param sourceTerminal
 * @param isElectroView
 * @returns an icon.
 */
const GetOffPageIcon = (offPageTerminal: Connector, sourceTerminal: Connector, isElectroView: boolean) => {
  if (isElectroView) return GetOffPageVerticalIcon(offPageTerminal, sourceTerminal);

  if (IsInputConnector(offPageTerminal)) {
    if (sourceTerminal?.isRequired) return icons.OffPageRequiredInputIcon;
    return icons.OffPageConnectedInputIcon;
  }

  if (sourceTerminal?.isRequired) return icons.OffPageRequiredOutputIcon;
  return icons.OffPageConnectedOutputIcon;
};

function GetOffPageVerticalIcon(offPageTerminal: Connector, sourceTerminal: Connector) {
  if (IsInputConnector(offPageTerminal)) {
    if (sourceTerminal?.isRequired) return icons.OffPageRequiredVerticalInputIcon;
    return icons.OffPageConnectedVerticalInputIcon;
  }

  if (sourceTerminal?.isRequired) return icons.OffPageRequiredVerticalOutputIcon;
  return icons.OffPageConnectedVerticalOutputIcon;
}

export default GetOffPageIcon;
