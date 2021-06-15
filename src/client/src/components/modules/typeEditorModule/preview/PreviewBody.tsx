import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { TypeEditorState } from "../../../../redux/store/typeEditor/types";

import { PreviewArea } from "../styled";

export const PreviewBody = () => {
  const state = useSelector<RootState>(
    (state) => state.typeEditor
  ) as TypeEditorState;

  const objectType = (type) => {};

  return <PreviewArea></PreviewArea>;
};

export default PreviewBody;
