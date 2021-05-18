import { TextResources } from "../../../assets/textResources";
import { TypeEditorModule } from "../typeEditorModule";
import { LegendModule } from "../legendModule";
import { LibraryComponent } from "./index";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../redux/store";
import { LibraryState } from "../../../redux/store/library/types";
import { searchLibrary } from "../../../redux/store/library/actions";
import { changeModuleVisibility } from "../../../redux/store/modules/actions";
import { MODULE_TYPE, LibCategory } from "../../../models/project";
import { SaveState } from "../../../redux/store/localStorage";
import { AnimatedModule, Size } from "../../../componentLibrary";
import { LibraryIcon, ToggleLeft, ToggleRight } from "../../../assets/icons";
import {
  ModuleBody,
  ModuleHeader,
} from "../../../componentLibrary/box/modules";

const LibraryModule = () => {
  const key = MODULE_TYPE.LIBRARY;
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

  const animate = useSelector<RootState>(
    (state) => state.modules.types.find((x) => x.type === key).animate
  ) as boolean;

  const isOpen = useSelector<RootState>(
    (state) => state.modules.types.find((x) => x.type === key).visible
  ) as boolean;

  const handleClick = () => {
    SaveState(!isOpen, key);
    dispatch(changeModuleVisibility(key, !isOpen, true));
  };

  const start = isOpen ? Size.ModuleClosed : Size.ModuleOpen;
  const stop = isOpen ? Size.ModuleOpen : Size.ModuleClosed;

  const libNodes = (): LibCategory[] => {
    var allCategories = [];

    const result = state.nodes.reduce(function (r, a) {
      r[a.category] = r[a.category] || [];
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

      allCategories.push(libCategory);
    });

    return allCategories;
  };

  return (
    <AnimatedModule start={start} stop={stop} run={animate}>
      <ModuleHeader library visible={isOpen}>
        <img src={LibraryIcon} alt="library-icon" />
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
        <TypeEditorModule />
      </ModuleBody>
      <LegendModule visible={isOpen} />
    </AnimatedModule>
  );
};

export default LibraryModule;
