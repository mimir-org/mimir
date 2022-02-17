import styled from "styled-components";
import { Color } from "../../../../../../../compLibrary/colors";
import { FontSize, FontType } from "../../../../../../../compLibrary/font";

export const CollectionsListWrapper = styled.div`
  display: flex;
  height: 90%;
  flex-direction: column;
  overflow-y: auto;

  button {
    min-height: 34px;
    border: 1.5px solid ${Color.GreyLibraryCollectionBorder};
    border-radius: 5px;

    .button-text {
      font-size: ${FontSize.Standard};
      font-family: ${FontType.Standard};
    }
  }
`;
