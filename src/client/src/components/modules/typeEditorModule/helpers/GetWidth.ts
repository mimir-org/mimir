import { ListType } from "../TypeEditorList";

const GetWidth = (listType: ListType) => {
  switch (listType) {
    case ListType.Terminals:
      return 2;
    case ListType.PredefinedAttributes:
      return 2;
    case ListType.Preview:
      return 1.5;
    default:
      return 1;
  }
};

export default GetWidth;
