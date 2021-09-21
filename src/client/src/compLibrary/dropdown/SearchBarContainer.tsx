import styled from "styled-components";
import { Color, FontType } from "..";

const SearchBarContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  max-height: 20px;
  font-family: ${FontType.Standard};
  background-color: ${Color.White};
  position: relative;
`;

export default SearchBarContainer;
