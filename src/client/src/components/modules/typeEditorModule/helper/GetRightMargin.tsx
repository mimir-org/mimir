import { TextResources } from "../../../../assets/textResources";

const GetRightMargin = (label: string) => {
  let rightMargin = 15;
  if (label === TextResources.TypeEditor_Symbol) {
    rightMargin = 0;
  }
  return rightMargin;
};

export default GetRightMargin;
