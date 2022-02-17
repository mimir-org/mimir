import styled from "styled-components";
import { FontSize, FontWeight } from "../../../compLibrary/font";
interface Props {
  isOpen: boolean;
}
const LibCategoryHeader = styled.span<Props>`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  font-size: ${FontSize.Standard};
  font-weight: ${(props) => (props.isOpen ? FontWeight.Bold : FontWeight.Normal)};
`;

export default LibCategoryHeader;
