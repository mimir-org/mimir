import styled from "styled-components";
import { Color } from "../../../../../compLibrary/colors";
import { FontSize, FontType } from "../../../../../compLibrary/font";

interface Props {
  manageCollections: boolean;
}

const CollectionBox = styled.div<Props>`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: inherit;
  height: 40px;
  padding: 9px;
  margin-bottom: 5px;
  border: 1px solid ${Color.GreyLibraryCollectionBorder};
  border-radius: 5px;

  p {
    font-size: ${FontSize.Standard};
    font-family: ${FontType.Standard};
  }

  .collections {
    margin-right: 14px;
  }

  .movable {
    margin: ${(props) => (props.manageCollections ? "13px 0px 13px 16px" : "13px 0px 13px auto")};
    cursor: grab;
  }

  label {
    margin-left: auto;
  }
`;

export default CollectionBox;
