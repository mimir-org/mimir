import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../redux/store";
import textResources from "../../../textResources";

import AnimatedMenu from "./styled/animated/AnimatedMenu";
import useLibraryToggleChangeHandler from "./hooks/useLibraryToggleChangeHandler";
import { LibraryIcon } from "../../../assets";
import { Header, ToggleBox } from "./styled";
import {
  ToggleRightButton,
  ToggleLeftButton,
} from "../../../assets/buttons/ToggleButton";

const LibraryModule = () => {
  const maxHeight = "331";
  const minHeight = "0";
  const hiddenHeight = "35";

  const dispatch = useDispatch();
  const showModule = useSelector<RootState>(
    (state) => state.showLibraryReducer.visible
  );
  const handleClick = useLibraryToggleChangeHandler(dispatch, showModule);

  return showModule ? (
    <AnimatedMenu start={minHeight} stop={maxHeight}>
      <ToggleBox>
        <ToggleRightButton onClick={handleClick} />
        <Header>
          <img src={LibraryIcon} alt="library-icon" />
          {textResources.Library_Heading}
        </Header>
      </ToggleBox>
    </AnimatedMenu>
  ) : (
    <AnimatedMenu start={maxHeight} stop={hiddenHeight}>
      <ToggleBox>
        <ToggleLeftButton onClick={handleClick} />
        <Header>
          <img src={LibraryIcon} alt="library-icon" />
          {textResources.Library_Heading}
        </Header>
      </ToggleBox>
    </AnimatedMenu>
  );
};

export default LibraryModule;
