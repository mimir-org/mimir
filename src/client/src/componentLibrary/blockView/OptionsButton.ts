import styled from "styled-components";
import { Color } from "..";

const OptionsButton = styled.div`
  height: 30px;
  border-top: 1px solid ${Color.Grey};
  padding: 10px 5px 0px 8px;

  &:hover {
    text-decoration: underline;
    background-color: ${Color.LightCyan};
    cursor: pointer;
  }
`;

export default OptionsButton;
