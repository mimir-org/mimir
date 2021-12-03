import styled from "styled-components";
import { Color } from "../../../../../compLibrary/colors";
import { FontSize, FontWeight } from "../../../../../compLibrary/font";

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 356px;
  min-height: 506px;
  margin-left: 20px;

  button {
    max-width: 223px;
    max-height: 34px;
    margin-top: 20px;
    background: ${Color.White};
    font-weight: ${FontWeight.Bold};
  }

  img {
    padding: 10px;
  }

  .button-text {
    white-space: nowrap;
    font-weight: ${FontWeight.Bold};
    font-size: ${FontSize.Header};
  }
`;

export default RightContainer;
