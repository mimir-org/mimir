import { setModuleVisibility } from "../../../redux/store/modules/modulesSlice";

const OnLibraryClick = (dispatch: any, open: boolean, libraryKey: string) => {
  dispatch(setModuleVisibility({ type: libraryKey, visible: !open, animate: true }));
};

export default OnLibraryClick;
