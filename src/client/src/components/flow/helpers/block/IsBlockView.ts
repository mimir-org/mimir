import { VIEW_TYPE } from "../../../../models/project";
import { GetView } from "../../../../redux/store/localStorage";

const IsBlockView = (): boolean => {
  return GetView() === VIEW_TYPE.BLOCKVIEW;
};

export default IsBlockView;
