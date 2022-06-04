import styled from "styled-components";
import { Color } from "../../../../../../assets/color/Color";
import { FontSize, FontType } from "../../../../../../assets/font";

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
    color: ${Color.BLACK};
    font-size: ${FontSize.MEDIUM};
    font-family:${FontType.STANDARD}
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
    background: ${Color.WHITE};
    min-width: 140px;
    height: 34px;
    border: 1.5px solid ${Color.BASTILLE};
    border-radius: 5px;

    .button-text {
      font-size: ${FontSize.STANDARD};
      font-family: ${FontType.STANDARD};
    }
  }
`;
