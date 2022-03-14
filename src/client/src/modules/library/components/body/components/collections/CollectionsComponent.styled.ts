import styled from "styled-components";
import { Color } from "../../../../../../compLibrary/colors";
import { FontSize, FontType } from "../../../../../../compLibrary/font";

interface CollectionsWrapperProps {
  manageCollections: boolean;
}

export const CollectionsWrapper = styled.div<CollectionsWrapperProps>`
  display: flex;
  width: inherit;
  height: ${(props) => (props.manageCollections ? "calc(100% - 60px)" : "inherit")};
  flex-direction: column;
  position: relative;

  p {
    text-align: center;
    color: ${Color.Black};
    font-size: ${FontSize.Medium};
    font-family:${FontType.Standard}
    padding: 10px 0;
  }
`;

export const CollectionsUpdateButtonWrapper = styled.div`
  height: 170px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;

  button {
    position: absolute;
    bottom: 5%;
    align-self: center;
    background: ${Color.White};
    min-width: 140px;
    height: 34px;
    border: 1.5px solid ${Color.BlueMagenta};
    border-radius: 5px;

    .button-text {
      font-size: ${FontSize.Standard};
      font-family: ${FontType.Standard};
    }
  }
`;
