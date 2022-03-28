import styled from "styled-components";
import { Color } from "../../../../compLibrary/colors/Color";

interface LibFooterProps {
  libOpen: boolean;
}

export const LibFooter = styled.div<LibFooterProps>`
  flex: 0 0 200px;
  padding: 25px 20px;

  display: grid;
  justify-content: center;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: min-content;
  gap: 30px 40px;

  background-color: ${Color.GHOST_WHITE};
  box-shadow: 0px -4px 10px 1px rgba(0, 0, 0, 0.05);
  opacity: ${(props) => (props.libOpen ? 1 : 0)};
`;
