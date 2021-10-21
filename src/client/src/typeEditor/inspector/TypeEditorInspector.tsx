import { useEffect } from "react";
import { Size } from "../../compLibrary";
import { CreateLibraryType } from "../../models";
import { MODULE_TYPE } from "../../models/project";
import { InspectorHeader } from "../../modules/inspector";
import { DragResizePanel } from "../../modules/inspector/helpers";
import { AnimatedInspector, ResizePanel } from "../../modules/inspector/styled";
import {
  useAppDispatch,
  useAppSelector,
  projectSelector,
  useParametricAppSelector,
  isAnimatedModuleSelector,
  isInspectorOpenSelector,
  isLibOpenSelector,
  isExplorerOpenSelector,
  iconSelector,
  attributeTypeSelector,
} from "../../redux/store";
import { useMemoArrayCompare } from "../helpers/useMemoArrayCompare";

interface Props {
  createLibraryType: CreateLibraryType;
}

export const TypeEditorInspector = ({ createLibraryType }: Props) => {
  const dispatch = useAppDispatch();

  const type = MODULE_TYPE.INSPECTOR;
  const project = useAppSelector(projectSelector);
  const animate = useParametricAppSelector(isAnimatedModuleSelector, type);
  const inspectorOpen = useAppSelector(isInspectorOpenSelector);
  const libOpen = useAppSelector(isLibOpenSelector);
  const explorerOpen = useAppSelector(isExplorerOpenSelector);
  const icons = useAppSelector(iconSelector);
  const attributeTypes = useAppSelector(attributeTypeSelector);

  const attributeLikeItems = useMemoArrayCompare(
    () => attributeTypes.filter((attr) => createLibraryType.attributeTypes.find((attrId) => attrId === attr.id)),
    [attributeTypes, createLibraryType.attributeTypes],
    createLibraryType.attributeTypes
  );

  const stop = inspectorOpen ? Size.ModuleOpen : Size.ModuleClosed;
  const start = inspectorOpen ? Size.ModuleClosed : Size.ModuleOpen;

  useEffect(() => {
    DragResizePanel(dispatch);
  }, [dispatch]);
  return (
    <AnimatedInspector
      id="InspectorModule"
      type={type}
      isLibraryOpen={libOpen}
      isExplorerOpen={explorerOpen}
      isInspectorOpen={inspectorOpen}
      start={start}
      stop={stop}
      run={animate}
    >
      <ResizePanel id="ResizePanel" />
      <InspectorHeader
        project={project}
        element={createLibraryType}
        dispatch={dispatch}
        open={inspectorOpen}
        type={type}
        icons={icons}
        attributeLikeItems={attributeLikeItems}
      />
    </AnimatedInspector>
  );
};

export default TypeEditorInspector;
