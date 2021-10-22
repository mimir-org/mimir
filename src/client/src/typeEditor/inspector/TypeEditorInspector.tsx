import { useRef } from "react";
import { Size } from "../../compLibrary";
import { CreateLibraryType } from "../../models";
import { MODULE_TYPE } from "../../models/project";
import { InspectorHeader } from "../../modules/inspector";
import { useDragResizePanel } from "../../modules/inspector/helpers/useDragResizePanel";
import { AnimatedInspector, ResizePanel } from "../../modules/inspector/styled";
import {
  useAppDispatch,
  useAppSelector,
  projectSelector,
  useParametricAppSelector,
  isAnimatedModuleSelector,
  isInspectorOpenSelector,
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
  const icons = useAppSelector(iconSelector);
  const attributeTypes = useAppSelector(attributeTypeSelector);

  const attributeLikeItems = useMemoArrayCompare(
    () => attributeTypes.filter((attr) => createLibraryType.attributeTypes.find((attrId) => attrId === attr.id)),
    [attributeTypes, createLibraryType.attributeTypes],
    createLibraryType.attributeTypes
  );

  const inspectorRef = useRef(null);
  const resizePanelRef = useRef(null);

  const stop = inspectorOpen ? Size.ModuleOpen : Size.ModuleClosed;
  const start = inspectorOpen ? Size.ModuleClosed : Size.ModuleOpen;

  useDragResizePanel(inspectorRef, resizePanelRef, dispatch, 355);

  return (
    <AnimatedInspector
      type={type}
      isLibraryOpen={false}
      isExplorerOpen={false}
      isInspectorOpen={inspectorOpen}
      isTypeEditor={true}
      start={start}
      stop={stop}
      run={animate}
      zIndex={110}
      forwardRef={inspectorRef}
    >
      <ResizePanel ref={resizePanelRef} />
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
