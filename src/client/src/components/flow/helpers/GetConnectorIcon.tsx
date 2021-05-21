import { PlusIcon, PlusFluidIcon } from "../../../assets/icons/blockView";
import { TERMINAL } from "../../../models/project";

const GetConnectorIcon = (type: string) => {
  let icon = type === TERMINAL.Fluid ? PlusFluidIcon : PlusIcon;

  return icon;
};

export default GetConnectorIcon;
