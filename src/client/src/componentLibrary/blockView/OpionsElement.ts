import styled from "styled-components";
import { Color } from "..";

const OptionsElement = styled.div`
  border-bottom: 1px solid ${Color.Grey};
  padding: 5px 5px 5px 5px;
  text-align: left;
  border-radius: 0px;

  &:hover {
    text-decoration: underline;
    background-color: ${Color.LightCyan};
    cursor: pointer;
  }
`;

export default OptionsElement;
