import styled from "styled-components";
import { FontSize, FontWeight } from "../../../../../compLibrary/font";

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin-left: 20px;

  button {
    min-width: 200px;
    max-width: 223px;
    height: 34px;
    margin-top: -11px;
  }

  img {
    padding: 10px;
  }

  .text {
    white-space: nowrap;
    font-weight: ${FontWeight.Bold};
    font-size: ${FontSize.Header};
    padding-right: 12px;
  }
`;

export default RightContainer;
