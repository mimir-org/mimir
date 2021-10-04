import styled from "styled-components";
import Color from "../colors/Color";

const SearchBarContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  max-height: 20px;
  font-family: roboto;
  background-color: ${Color.White};
  position: relative;
`;

export default SearchBarContainer;
