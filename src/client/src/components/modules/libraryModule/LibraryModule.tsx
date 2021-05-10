import { TextResources } from "../../../assets/textResources";
import { TypeEditorModule } from "../typeEditorModule";
import { LegendModule } from "../legendModule";
import { LibaryComponent } from "./index";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../redux/store";
import { LibraryState } from "../../../redux/store/library/types";
import { searchLibrary } from "../../../redux/store/library/actions";
import { changeModuleVisibility } from "../../../redux/store/modules/actions";
import { MODULE_TYPE } from "../../../models/project";
import { ModuleBody, ModuleHeader } from "../../../componentLibrary/box";
import { SaveState } from "../../../redux/store/localStorage/localStorage";
import { AnimatedModule, Size } from "../../../componentLibrary";
import {
  LibraryIcon,
  ToggleIconLeft,
  ToggleIconRight,
} from "../../../assets/icons";

const LibraryModule = () => {
  const key = MODULE_TYPE.LIBRARY;
  const dispatch = useDispatch();
  const state = useSelector<RootState>(
    (state) => state.library
  ) as LibraryState;

  useEffect(() => {
    dispatch(searchLibrary(""));
  }, [dispatch]);

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

  return (
    <AnimatedModule start={start} stop={stop} run={animate}>
      <ModuleHeader right visible={isOpen}>
        <img src={LibraryIcon} alt="library-icon" />
        <img
          className="icon"
          src={isOpen ? ToggleIconRight : ToggleIconLeft}
          alt="toggle"
          onClick={handleClick}
        />
        <p className="text">{TextResources.Library_Heading}</p>
      </ModuleHeader>
      <ModuleBody visible={isOpen} left>
        <LibaryComponent nodes={state.nodes} />
        <TypeEditorModule />
        <LegendModule />
      </ModuleBody>
    </AnimatedModule>
  );
};

export default LibraryModule;
