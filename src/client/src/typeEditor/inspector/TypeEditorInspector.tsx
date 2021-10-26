import { useCallback, useEffect, useRef } from "react";
import { Action, Dispatch } from "redux";
import { Size } from "../../compLibrary";
import { CreateLibraryType } from "../../models";
import { MODULE_TYPE } from "../../models/project";
import { InspectorHeader } from "../../modules/inspector";
import { SetPanelHeight } from "../../modules/inspector/helpers";
import { useDragResizePanel } from "../../modules/inspector/helpers/useDragResizePanel";
import { AnimatedInspector, ResizePanel } from "../../modules/inspector/styled";
import {
  useAppDispatch,
  useAppSelector,
  projectSelector,
  useParametricAppSelector,
  isAnimatedModuleSelector,
  iconSelector,
  attributeTypeSelector,
  isTypeEditorInspectorOpen,
} from "../../redux/store";
import { useMemoArrayCompare } from "../helpers/useMemoArrayCompare";
import { changeTypeEditorInspectorHeight, changeTypeEditorInspectorVisibility } from "../redux/actions";

interface Props {
  createLibraryType: CreateLibraryType;
  typeEditorPropertiesRef: React.MutableRefObject<HTMLDivElement>;
}

export const TypeEditorInspector = ({ createLibraryType, typeEditorPropertiesRef }: Props) => {
  const dispatch = useAppDispatch();

  const type = MODULE_TYPE.INSPECTOR;
  const project = useAppSelector(projectSelector);
  const animate = useParametricAppSelector(isAnimatedModuleSelector, type);
  const inspectorOpen = useAppSelector(isTypeEditorInspectorOpen);
  const icons = useAppSelector(iconSelector);
  const attributeTypes = useAppSelector(attributeTypeSelector);

  const attributeLikeItems = useMemoArrayCompare(
    () => attributeTypes.filter((attr) => createLibraryType.attributeTypes.find((attrId) => attrId === attr.id)),
    [attributeTypes, createLibraryType.attributeTypes],
    createLibraryType.attributeTypes
  );

  const initialRenderCompleted = useRef(false);

  useEffect(() => {
    initialRenderCompleted.current = true;
  }, []);

  const inspectorRef = useRef(null);
  const resizePanelRef = useRef(null);

  const stop = inspectorOpen ? Size.TypeEditorInspectorOpen : Size.ModuleClosed;
  const start = inspectorOpen ? Size.ModuleClosed : Size.TypeEditorInspectorOpen;

  useDragResizePanel(
    inspectorRef,
    resizePanelRef,
    typeEditorPropertiesRef,
    dispatch,
    changeTypeEditorInspectorHeight,
    Size.TypeEditorInspectorOpen
  );

  const onToggleWrapped = useCallback(
    (
      _dispatch: Dispatch,
      open: boolean,
      _inspectorRef: React.MutableRefObject<HTMLDivElement>,
      changeInspectorVisibilityAction: (visibility: boolean) => Action,
      changeInspectorHeightAction: (height: number) => Action
    ) => {
      _dispatch(changeInspectorVisibilityAction(!open));
      _dispatch(changeInspectorHeightAction(open ? Size.ModuleClosed : Size.TypeEditorInspectorOpen));
      SetPanelHeight(_inspectorRef, open ? Size.ModuleClosed : Size.TypeEditorInspectorOpen);
      SetPanelHeight(typeEditorPropertiesRef, open ? Size.TypeEditorPropertiesFull : Size.TypeEditorPropertiesShrunk);
    },
    [typeEditorPropertiesRef]
  );

  return (
    <AnimatedInspector
      type={type}
      isLibraryOpen={false}
      isExplorerOpen={false}
      isInspectorOpen={inspectorOpen}
      isTypeEditor={true}
      start={start}
      stop={stop}
      run={initialRenderCompleted.current ? animate : false}
      zIndex={110}
      forwardRef={inspectorRef}
    >
      <ResizePanel ref={resizePanelRef} />
      <InspectorHeader
        project={project}
        element={createLibraryType}
        dispatch={dispatch}
        open={inspectorOpen}
        icons={icons}
        attributeLikeItems={attributeLikeItems}
        terminalLikeItems={createLibraryType.terminalTypes}
        inspectorRef={inspectorRef}
        changeInspectorVisibilityAction={changeTypeEditorInspectorVisibility}
        changeInspectorHeightAction={changeTypeEditorInspectorHeight}
        onToggle={onToggleWrapped}
      />
    </AnimatedInspector>
  );
};

export default TypeEditorInspector;
