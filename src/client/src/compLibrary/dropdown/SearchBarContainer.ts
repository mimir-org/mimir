import styled from "styled-components";
import { FontType } from "../font";

const SearchBarContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  max-height: 20px;
  font-family: ${FontType.Standard};
  position: relative;
`;

export default SearchBarContainer;
