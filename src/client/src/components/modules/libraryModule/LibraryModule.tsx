import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../redux/store";
import textResources from "../../../textResources";
import styled from "styled-components";
import {
  ToggleRightButton,
  ToggleLeftButton,
} from "../../../assets/icons/ToggleButton";
import AnimatedMenu from "./styled/animated/AnimatedMenu";
import useLibraryToggleChangeHandler from "./hooks/useLibraryToggleChangeHandler";

const ToggleBox = styled.div`
  display: flex;
  float: left;
  margin-left: 7px;
  margin-top: 13px;
`;

const Header = styled.div`
  margin-left: 120px;
  margin-top: 7px;
  font-family: roboto;
  color: #000;
  size: 18px;
  font-weight: 700;
`;

const LibraryModule = () => {
  const dispatch = useDispatch();
  const showModule = useSelector<RootState>(
    (state) => state.showLibraryReducer.visible
  );
  const handleClick = useLibraryToggleChangeHandler(dispatch, showModule);

  return showModule ? (
    <AnimatedMenu start="0" stop="331">
      <ToggleBox>
        <ToggleRightButton onClick={handleClick} />
        <Header>{textResources.Library_Heading}</Header>
      </ToggleBox>
    </AnimatedMenu>
  ) : (
    <AnimatedMenu start="331" stop="35">
      <ToggleBox>
        <ToggleLeftButton onClick={handleClick} />
        <Header>{textResources.Library_Heading}</Header>
      </ToggleBox>
    </AnimatedMenu>
  );
};

export default LibraryModule;
