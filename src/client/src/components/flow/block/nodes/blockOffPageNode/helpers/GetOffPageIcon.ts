import * as icons from "../../../../../../assets/icons/offpage";
import { Connector } from "../../../../../../models";
import { IsInputTerminal } from "../../../../helpers";

const GetOffPageIcon = (offPageterminal: Connector, sourceTerminal: Connector) => {
  if (IsInputTerminal(offPageterminal)) {
    if (sourceTerminal?.isRequired) return icons.OffPageRequiredInputIcon;
    return icons.OffPageConnectedInputIcon;
  }

  if (sourceTerminal?.isRequired) return icons.OffPageRequiredOutputIcon;
  return icons.OffPageConnectedOutputIcon;
};

export default GetOffPageIcon;
