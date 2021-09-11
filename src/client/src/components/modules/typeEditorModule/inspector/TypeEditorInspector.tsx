import { InspectorComponent } from "../../../../modules/inspector";
import { InspectorMenu } from "../../../../compLibrary/box/inspector";
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
    <InspectorMenu bgColor="transparent" noTopBorder={true} top={50}>
      <InspectorComponent index={1} project={project} />
      {IsFunction(aspect) && <InspectorComponent index={2} project={project} />}
    </InspectorMenu>
  );
};

export default TypeEditorInspector;
