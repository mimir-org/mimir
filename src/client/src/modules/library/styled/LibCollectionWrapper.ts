import styled from "styled-components";
import { Color } from "../../../compLibrary/colors";

interface Props {
  isOpen: boolean;
}

const LibCollectionWrapper = styled.div<Props>`
  display: flex;
  background-color: ${Color.GreyLight};
  margin: ${(props) => (props.isOpen ? "2px 0px 2px 0px" : "2px 0px 5px 0px")};
  border: 1px solid ${(props) => (props.isOpen ? Color.BlueMagenta : Color.GreyLibraryCollectionBorder)};
  border-radius: 5px;
  flex-direction: column;
`;

export default LibCollectionWrapper;
