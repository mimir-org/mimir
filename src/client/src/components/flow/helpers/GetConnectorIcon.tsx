import { PlusIcon, PlusFluidIcon } from "../../../assets/icons/blockView";
import { TERMINAL_TYPE } from "../../../models/project";

const GetConnectorIcon = (type: string) => {
  let icon = type === TERMINAL_TYPE.Fluid ? PlusFluidIcon : PlusIcon;

  return icon;
};

export default GetConnectorIcon;
