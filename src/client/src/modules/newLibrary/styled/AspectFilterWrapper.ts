import styled from "styled-components";
import { Color } from "../../../compLibrary/colors";
import { FontSize, FontType } from "../../../compLibrary/font";

const AspectFilterWrapper = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & :hover {
    cursor: pointer;
    text-decoration: underline;
  }

  span {
    font-size: ${FontSize.Medium};
    font-family: ${FontType.Standard};
    color: ${Color.Black};
    padding: 4px 0px;
  }
`;

export default AspectFilterWrapper;
