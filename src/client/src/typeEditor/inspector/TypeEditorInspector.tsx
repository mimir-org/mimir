import { useCallback, useEffect, useMemo, useRef } from "react";
import { Action, Dispatch } from "redux";
import { Size } from "../../compLibrary/size";
import { CreateLibraryType } from "../../models";
import { MODULE_TYPE } from "../../models/project";
import { InspectorHeader } from "../../modules/inspector";
import { SetPanelHeight } from "../../modules/inspector/helpers";
import { useDragResizePanel } from "../../modules/inspector/helpers/useDragResizePanel";
import { AnimatedInspector, ResizePanel } from "../../modules/inspector/styled";
import { GetFilteredTerminalTypeExtendedList, GetPropertiesHeight } from "../helpers";
import {
  changeTypeEditorInspectorHeight,
  changeTypeEditorInspectorTab,
  changeTypeEditorInspectorVisibility,
} from "../redux/typeEditorSlice";
import {
  animatedModuleSelector,
  attributeTypeSelector,
  iconSelector,
  isTypeEditorInspectorOpen,
  projectSelector,
  simpleTypeSelector,
  terminalTypeSelector,
  typeEditorInspectorActiveTabSelector,
  useAppDispatch,
  useAppSelector,
  useParametricAppSelector,
  usernameSelector,
} from "../../redux/store";

interface Props {
  createLibraryType: CreateLibraryType;
  typeEditorPropertiesRef: React.MutableRefObject<HTMLDivElement>;
}

export const TypeEditorInspector = ({ createLibraryType, typeEditorPropertiesRef }: Props) => {
  const dispatch = useAppDispatch();

  const type = MODULE_TYPE.INSPECTOR;
  const project = useAppSelector(projectSelector);
  const username = useAppSelector(usernameSelector);
  const animate = useParametricAppSelector(animatedModuleSelector, type);
  const inspectorOpen = useAppSelector(isTypeEditorInspectorOpen);
  const activeTabIndex = useAppSelector(typeEditorInspectorActiveTabSelector);
  const icons = useAppSelector(iconSelector);
  const attributeTypes = useAppSelector(attributeTypeSelector);
  const terminalTypes = useAppSelector(terminalTypeSelector);
  const simpleTypes = useAppSelector(simpleTypeSelector);
  const stop = inspectorOpen ? Size.TypeEditorInspectorOpen : Size.ModuleClosed;
  const start = inspectorOpen ? Size.ModuleClosed : Size.TypeEditorInspectorOpen;

  const attributeLikeItems = useMemo(
    () => attributeTypes.filter((attr) => createLibraryType.attributeTypes.find((attrId) => attrId === attr.id)),
    [attributeTypes, createLibraryType.attributeTypes]
  );

  const terminalLikeItems = useMemo(
    () => GetFilteredTerminalTypeExtendedList(terminalTypes, createLibraryType.terminalTypes),
    [terminalTypes, createLibraryType.terminalTypes]
  );

  const simpleLikeItems = useMemo(
    () => simpleTypes.filter((simp) => createLibraryType.simpleTypes.find((comp) => simp.id === comp)),
    [simpleTypes, createLibraryType.simpleTypes]
  );

  const initialRenderCompleted = useRef(false);

  useEffect(() => {
    initialRenderCompleted.current = true;
  }, []);

  const inspectorRef = useRef(null);
  const resizePanelRef = useRef(null);

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
      SetPanelHeight(typeEditorPropertiesRef, GetPropertiesHeight(open));
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
      <ResizePanel ref={resizePanelRef} isInspectorOpen={inspectorOpen} />
      <InspectorHeader
        project={project}
        element={createLibraryType}
        username={username}
        dispatch={dispatch}
        open={inspectorOpen}
        activeTabIndex={activeTabIndex}
        icons={icons}
        attributeLikeItems={attributeLikeItems}
        terminalLikeItems={terminalLikeItems}
        simpleLikeItems={simpleLikeItems}
        inspectorRef={inspectorRef}
        isInspectorOpen={inspectorOpen}
        changeInspectorVisibilityAction={changeTypeEditorInspectorVisibility}
        changeInspectorHeightAction={changeTypeEditorInspectorHeight}
        changeInspectorTabAction={changeTypeEditorInspectorTab}
        onToggle={onToggleWrapped}
      />
    </AnimatedInspector>
  );
};

export default TypeEditorInspector;
