import { setModuleVisibility } from "../../../redux/store/modules/actions";

const OnLibraryClick = (
  dispatch: any,
  open: boolean,
  libraryKey: string,
  legendKey: string
) => {
  dispatch(setModuleVisibility(libraryKey, !open, true));
  dispatch(setModuleVisibility(legendKey, !open, true));
};

export default OnLibraryClick;
