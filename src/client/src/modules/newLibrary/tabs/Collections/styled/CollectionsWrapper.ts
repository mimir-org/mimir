import styled from "styled-components";
import { Color } from "../../../../../compLibrary/colors";
import { FontSize, FontType } from "../../../../../compLibrary/font";

interface Props {
  manageCollections: boolean;
}

const CollectionsWrapper = styled.div<Props>`
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
    padding: 10px 0px;
  }

  button {
      position:${(props) => (props.manageCollections ? "absolute" : "relative")};
      bottom: ${(props) => (props.manageCollections ? "5%" : "")};
      align-self: center;
      background: transparent;
      max-width: 200px;
      height: 34px;
      border: 1.5px solid ${Color.BlueMagenta};
      border-radius: 5px;

      .button-text {
        font-size: ${FontSize.Standard};
        font-family:${FontType.Standard}
      }
  }
`;

export default CollectionsWrapper;
