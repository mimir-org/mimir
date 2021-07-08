import { TextResources } from "../../../../assets/text";

const GetRightMargin = (label: string) => {
  let rightMargin = 15;
  if (label === TextResources.TypeEditor_Symbol) {
    rightMargin = 0;
  }
  return rightMargin;
};

export default GetRightMargin;
