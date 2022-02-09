import styled from "styled-components";
import { Color } from "../../../compLibrary/colors";
import { FontSize, FontType } from "../../../compLibrary/font";

const AspectFilterButtonContainer = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: transparent;
  border: 0;
  padding: 0;

  :hover {
    cursor: pointer;
    text-decoration: underline;
  }

  span {
    font-size: ${FontSize.Medium};
    font-family: ${FontType.Standard};
    color: ${Color.Black};
    padding: 4px 0;
  }
`;

export default AspectFilterButtonContainer;
