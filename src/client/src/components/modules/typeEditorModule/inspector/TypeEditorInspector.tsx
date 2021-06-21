import { TabComponent } from "../../inspectorModule";
import { InspectorBody } from "../../../../compLibrary/box/inspector";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { TypeEditorState } from "../../../../redux/store/typeEditor/types";
import { Aspect } from "../../../../models";

export const TypeEditorInspector = () => {
  const state = useSelector<RootState>(
    (state) => state.typeEditor
  ) as TypeEditorState;
  return (
    <>
      <InspectorBody bgColor="transparent" noTopBorder={true} top={50}>
        <TabComponent index={1} />
        {state.createLibraryType.aspect === Aspect.Function ? (
          <TabComponent index={2} />
        ) : null}
      </InspectorBody>
    </>
  );
};

export default TypeEditorInspector;
