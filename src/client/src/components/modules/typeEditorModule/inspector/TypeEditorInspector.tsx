import { InspectorComponent } from "../../../../modules/inspector";
import { Menu } from "../../../../modules/inspector/styled";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { TypeEditorState } from "../../../../redux/store/typeEditor/types";
import { IsFunction } from "../helpers";

export const TypeEditorInspector = () => {
  const state = useSelector<RootState>((s) => s.typeEditor) as TypeEditorState;
  const aspect = state.createLibraryType.aspect;

  return (
    <Menu bgColor="transparent" noTopBorder={true} top={50}>
      <InspectorComponent index={1} />
      {IsFunction(aspect) && <InspectorComponent index={2} />}
    </Menu>
  );
};

export default TypeEditorInspector;
