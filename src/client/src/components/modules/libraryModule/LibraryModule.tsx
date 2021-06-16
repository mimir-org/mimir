import { TextResources } from "../../../assets/textResources";
import { LegendModule } from "../legendModule";
import { TypeEditorModule } from "../typeEditorModule";
import { LibraryComponent } from "./index";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../redux/store";
import { LibraryState } from "../../../redux/store/library/types";
import { searchLibrary } from "../../../redux/store/library/actions";
import { changeModuleVisibility } from "../../../redux/store/modules/actions";
import { AnimatedModule, Size } from "../../../compLibrary";
import { ValidateLibComponent } from "./helpers";
import { IsBlockView } from "../../flow/helpers/block";
import { ModuleBody, ModuleHead } from "../../../compLibrary/box/modules";
import { LegendHead, LegendIcons } from "../../../compLibrary/box/library";
import { MODULE_TYPE, LibCategory, Node } from "../../../models/project";
import {
  LegendIcon,
  LibraryIcon,
  ToggleDown,
  ToggleLeft,
  ToggleRight,
  ToggleUp,
} from "../../../assets/icons/common";

const LibraryModule = () => {
  const libraryKey = MODULE_TYPE.LIBRARY;
  const legendKey = MODULE_TYPE.LEGEND;
  const dispatch = useDispatch();
  const state = useSelector<RootState>(
    (state) => state.library
  ) as LibraryState;

  useEffect(() => {
    dispatch(searchLibrary(""));
  }, [dispatch]);

  const search = (text: string) => {
    dispatch(searchLibrary(text));
  };

  const libraryOpen = useSelector<RootState>(
    (state) => state.modules.types.find((x) => x.type === libraryKey).visible
  ) as boolean;

  const legendOpen = useSelector<RootState>(
    (state) => state.modules.types.find((x) => x.type === legendKey).visible
  ) as boolean;

  const animate = useSelector<RootState>(
    (state) => state.modules.types.find((x) => x.type === libraryKey).animate
  ) as boolean;

  const animateLegend = useSelector<RootState>(
    (state) => state.modules.types.find((x) => x.type === legendKey).animate
  ) as boolean;

  const onLibraryClick = () => {
    dispatch(changeModuleVisibility(libraryKey, !libraryOpen, true));
    dispatch(changeModuleVisibility(legendKey, !libraryOpen, true));
  };

  const onLegendClick = () => {
    dispatch(changeModuleVisibility(legendKey, !legendOpen, true));
  };

  const start = libraryOpen ? Size.ModuleClosed : Size.ModuleOpen;
  const stop = libraryOpen ? Size.ModuleOpen : Size.ModuleClosed;
  const startLegend = legendOpen ? Size.ModuleClosed : Size.ModuleOpen;
  const stopLegend = legendOpen ? Size.ModuleOpen : Size.ModuleClosed;

  const isBlockView = IsBlockView();
  const isSplitView = useSelector<RootState>(
    (state) => state.splitView.visible
  ) as boolean;

  const selectedNode = useSelector<RootState>((state) =>
    state.projectState.project?.nodes?.find((x) => x.isSelected)
  ) as Node;

  const libNodes = (): LibCategory[] => {
    var allCategories = [];

    const result = state.nodes.reduce((r, a) => {
      r[a.category] = r[a.category] || [];

      ValidateLibComponent(a, selectedNode, isBlockView, isSplitView) &&
        r[a.category].push(a);

      return r;
    }, Object.create([]));

    const objectArray = Object.entries(result);

    objectArray.forEach(([key, value]) => {
      var libCategory = {
        name: key,
        nodes: value,
        visible: false,
      } as LibCategory;

      libCategory.nodes.length > 0 && allCategories.push(libCategory);
    });
    return allCategories;
  };

  return (
    <>
      <AnimatedModule
        start={start}
        stop={stop}
        run={animate}
        type={libraryKey}
        id={libraryKey}
      >
        <ModuleHead library visible={libraryOpen}>
          <img src={LibraryIcon} alt="library-icon" className="module-icon" />
          <img
            className="icon"
            src={libraryOpen ? ToggleRight : ToggleLeft}
            alt="toggle"
            onClick={onLibraryClick}
          />
          <p className="text">{TextResources.Library_Heading}</p>
        </ModuleHead>
        <ModuleBody visible={libraryOpen} library>
          <LibraryComponent categories={libNodes()} search={search} />
          {/* <TypeEditorModule /> */}
        </ModuleBody>
        <AnimatedModule
          start={startLegend}
          stop={stopLegend}
          run={animateLegend}
          type={legendKey}
          id={legendKey}
        >
          <ModuleHead legend>
            <LegendHead open={legendOpen}>
              {legendOpen ? (
                <img src={ToggleDown} alt="" onClick={onLegendClick} />
              ) : (
                <img src={ToggleUp} alt="" onClick={onLegendClick} />
              )}
            </LegendHead>
            <LegendIcons open={legendOpen}>
              <img src={LegendIcon} alt="legend" className="icon" />
              <p className="text">{TextResources.Legend_Heading}</p>
            </LegendIcons>
          </ModuleHead>
          <LegendModule visible={true} />
        </AnimatedModule>
      </AnimatedModule>
    </>
  );
};

export default LibraryModule;
