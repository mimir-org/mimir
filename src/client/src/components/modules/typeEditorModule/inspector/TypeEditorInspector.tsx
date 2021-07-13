import { TabComponent } from "../../inspectorModule";
import { InspectorBody } from "../../../../compLibrary/box/inspector";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { TypeEditorState } from "../../../../redux/store/typeEditor/types";
import { IsFunction } from "../helpers";

export const TypeEditorInspector = () => {
  const state = useSelector<RootState>((s) => s.typeEditor) as TypeEditorState;
  const aspect = state.createLibraryType.aspect;

  return (
    <InspectorBody bgColor="transparent" noTopBorder={true} top={50}>
      <TabComponent index={1} />
      {IsFunction(aspect) && <TabComponent index={2} />}
    </InspectorBody>
  );
};

export default TypeEditorInspector;
