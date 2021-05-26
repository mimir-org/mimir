import { TextResources } from "../../../assets/textResources";
import { LegendModule } from "../legendModule";
import { LibraryComponent } from "./index";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../redux/store";
import { LibraryState } from "../../../redux/store/library/types";
import { searchLibrary } from "../../../redux/store/library/actions";
import { changeModuleVisibility } from "../../../redux/store/modules/actions";
import { SaveState } from "../../../redux/store/localStorage";
import { AnimatedModule, Size } from "../../../componentLibrary";
import { ValidateLibComponent } from "./helpers";
import { IsBlockView } from "../../flow/helpers/block";
import {
  ModuleBody,
  ModuleHeader,
} from "../../../componentLibrary/box/modules";
import {
  LegendHeader,
  LegendIcons,
} from "../../../componentLibrary/box/library";
import { MODULE_TYPE, LibCategory, Node } from "../../../models/project";
import {
  LegendIcon,
  LibraryIcon,
  ToggleDown,
  ToggleLeft,
  ToggleRight,
  ToggleUp,
} from "../../../assets/icons";

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

  const legendOpen = useSelector<RootState>(
    (state) => state.modules.types.find((x) => x.type === legendKey).visible
  ) as boolean;

  const animate = useSelector<RootState>(
    (state) => state.modules.types.find((x) => x.type === libraryKey).animate
  ) as boolean;

  const animateLegend = useSelector<RootState>(
    (state) => state.modules.types.find((x) => x.type === legendKey).animate
  ) as boolean;

  const isOpen = useSelector<RootState>(
    (state) => state.modules.types.find((x) => x.type === libraryKey).visible
  ) as boolean;

  const handleClick = () => {
    SaveState(!isOpen, libraryKey);
    dispatch(changeModuleVisibility(libraryKey, !isOpen, true));
    SaveState(!isOpen, legendKey);
    dispatch(changeModuleVisibility(legendKey, !isOpen, true));
  };

  const handleLegendClick = () => {
    SaveState(!legendOpen, legendKey);
    dispatch(changeModuleVisibility(legendKey, !legendOpen, true));
  };

  const start = isOpen ? Size.ModuleClosed : Size.ModuleOpen;
  const stop = isOpen ? Size.ModuleOpen : Size.ModuleClosed;
  const startLegend = legendOpen ? Size.ModuleClosed - 1 : Size.ModuleOpen;
  const stopLegend = legendOpen ? Size.ModuleOpen : Size.ModuleClosed - 1;

  const isBlockView = IsBlockView();
  const isSplitView = useSelector<RootState>(
    (state) => state.splitView.visible
  ) as boolean;

  const selectedNode = useSelector<RootState>((state) =>
    state.projectState.project?.nodes.find((x) => x.isSelected)
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
      <AnimatedModule start={start} stop={stop} run={animate}>
        <ModuleHeader library visible={isOpen}>
          <img src={LibraryIcon} alt="library-icon" className="module-icon" />
          <img
            className="icon"
            src={isOpen ? ToggleRight : ToggleLeft}
            alt="toggle"
            onClick={handleClick}
          />
          <p className="text">{TextResources.Library_Heading}</p>
        </ModuleHeader>
        <ModuleBody visible={isOpen} library>
          <LibraryComponent categories={libNodes()} search={search} />
          {/* <TypeEditorModule /> */}
        </ModuleBody>
        <AnimatedModule
          start={startLegend}
          stop={stopLegend}
          run={animateLegend}
          type={MODULE_TYPE.LEGEND}
        >
          <ModuleHeader legend>
            <LegendHeader open={legendOpen}>
              {legendOpen ? (
                <img src={ToggleDown} alt="" onClick={handleLegendClick} />
              ) : (
                <img src={ToggleUp} alt="" onClick={handleLegendClick} />
              )}
            </LegendHeader>
            <LegendIcons open={legendOpen}>
              <img src={LegendIcon} alt="inspector-icon" />
              {TextResources.Legend_Heading}
            </LegendIcons>
          </ModuleHeader>
          <LegendModule visible={true} />
        </AnimatedModule>
      </AnimatedModule>
    </>
  );
};

export default LibraryModule;
