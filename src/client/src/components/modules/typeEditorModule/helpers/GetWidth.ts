import { ListType } from "../TypeEditorList";

const GetWidth = (listType: ListType) => {
  switch (listType) {
    case ListType.Terminals:
      return 35;
    case ListType.PredefinedAttributes:
      return 35;
    default:
      return 20;
  }
};

export default GetWidth;
