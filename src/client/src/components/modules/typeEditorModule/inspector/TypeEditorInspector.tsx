import { TabComponent } from "../../inspectorModule";
import { InspectorBody } from "../../../../compLibrary/box/inspector";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { TypeEditorState } from "../../../../redux/store/typeEditor/types";
import { IsFunction } from "../helpers";
import { Project } from "../../../../models";

export const TypeEditorInspector = () => {
  const state = useSelector<RootState>((s) => s.typeEditor) as TypeEditorState;
  const project = useSelector<RootState>(
    (s) => s.projectState?.project
  ) as Project;

  const aspect = state.createLibraryType.aspect;

  return (
    <InspectorBody bgColor="transparent" noTopBorder={true} top={50}>
      <TabComponent index={1} project={project} />
      {IsFunction(aspect) && <TabComponent index={2} project={project} />}
    </InspectorBody>
  );
};

export default TypeEditorInspector;
