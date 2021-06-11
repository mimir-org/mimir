import styled from "styled-components";
import { Color, FontSize, FontType } from "../../../../componentLibrary";

const AddTerminalElement = styled.div`
  display: flex;
  flex-direction: row;
  padding: 2px 8px 2px 20px;
  background-color: inherit;

  img {
    padding: 0px 8px 0px 5px;
    opacity: 0.4;
  }

  img:hover {
    opacity: 1;
  }
`;

export default AddTerminalElement;
