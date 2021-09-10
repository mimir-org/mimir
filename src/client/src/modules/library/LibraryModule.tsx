import { TextResources } from "../../assets/text";
import { LegendModule } from "../../modules/legend";
import { LibraryComponent } from "./index";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { LibraryState } from "../../redux/store/library/types";
import { searchLibrary } from "../../redux/store/library/actions";
import { AnimatedModule, Size } from "../../compLibrary";
import { GetLibCategories } from "./helpers";
import { ModuleBody, ModuleHead } from "../../compLibrary/box/modules";
import { LegendHead, LegendIcons } from "../../compLibrary/box/library";
import { MODULE_TYPE } from "../../models/project";
import { GetSelectedNode } from "../../components/flow/helpers/common";
import { OnLibraryClick, OnLegendClick } from "./handlers";
import {
  LegendIcon,
  LibraryIcon,
  DownIcon,
  LeftIcon,
  RightIcon,
  UpIcon,
} from "../../assets/icons/common";

const LibraryModule = () => {
  const libraryKey = MODULE_TYPE.LIBRARY;
  const legendKey = MODULE_TYPE.LEGEND;
  const dispatch = useDispatch();

  const libraryState = useSelector<RootState>(
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

  const isSplitView = useSelector<RootState>(
    (state) => state.splitView.visible
  ) as boolean;

  const selectedNode = GetSelectedNode();
  const start = libraryOpen ? Size.ModuleClosed : Size.ModuleOpen;
  const stop = libraryOpen ? Size.ModuleOpen : Size.ModuleClosed;
  const startLegend = legendOpen ? Size.ModuleClosed : Size.ModuleOpen;
  const stopLegend = legendOpen ? Size.ModuleOpen : Size.ModuleClosed;

  return (
    <AnimatedModule
      start={start}
      stop={stop}
      run={animate}
      type={libraryKey}
      id="LibraryModule"
    >
      <ModuleHead library visible={libraryOpen}>
        <img src={LibraryIcon} alt="library-icon" className="module-icon" />
        <img
          className="icon"
          src={libraryOpen ? RightIcon : LeftIcon}
          alt="toggle"
          onClick={() =>
            OnLibraryClick(dispatch, libraryOpen, libraryKey, legendKey)
          }
        />
        <p className="text">{TextResources.Module_Library}</p>
      </ModuleHead>
      <ModuleBody visible={libraryOpen} library>
        <LibraryComponent
          categories={GetLibCategories(selectedNode, isSplitView, libraryState)}
          search={search}
        />
      </ModuleBody>

      <AnimatedModule
        start={startLegend}
        stop={stopLegend}
        run={animateLegend}
        type={legendKey}
        id="LegendModule"
      >
        <ModuleHead legend>
          <LegendHead open={legendOpen}>
            <img
              src={legendOpen ? DownIcon : UpIcon}
              alt=""
              onClick={() => OnLegendClick(dispatch, legendOpen, legendKey)}
            />
          </LegendHead>
          <LegendIcons open={legendOpen}>
            <img src={LegendIcon} alt="legend" className="icon" />
            <p className="text">{TextResources.Module_Legend}</p>
          </LegendIcons>
        </ModuleHead>
        <LegendModule visible={true} />
      </AnimatedModule>
    </AnimatedModule>
  );
};

export default LibraryModule;
