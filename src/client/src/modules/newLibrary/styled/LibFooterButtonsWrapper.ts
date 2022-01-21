import styled from "styled-components";
import { Color } from "../../../compLibrary/colors";
import { FontSize, FontType } from "../../../compLibrary/font";

const LibFooterButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 41px;

  button {
    background: transparent;
    min-width: 131px;
    max-width: 187px;
    white-space: nowrap;
    height: 34px;
    border: 1.5px solid ${Color.BlueMagenta};
    border-radius: 5px;

    .button-text {
      font-size: ${FontSize.Standard};
      font-family: ${FontType.Standard};
    }
  }
`;

export default LibFooterButtonsWrapper;
