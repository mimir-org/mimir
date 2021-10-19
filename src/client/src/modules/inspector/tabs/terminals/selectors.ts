import { createAppSelector, RootState } from "../../../../redux/store";

export const categoryTypeSelector = createAppSelector(
  (state: RootState) => state.typeEditor.terminals,
  (terminals) => terminals ?? []
);
