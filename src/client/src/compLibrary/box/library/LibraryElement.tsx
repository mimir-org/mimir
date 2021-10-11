import styled from "styled-components";
import { Color, FontSize } from "../../";

interface Props {
  active: boolean;
}

const LibraryElement = styled.div<Props>`
  width: 286px;
  height: 36px;
  border: ${(props) => (props.active ? "1px solid black" : "1px solid" + Color.DarkerGrey)};
  border-style: ${(props) => (props.active ? "dashed" : "default")};
  border-radius: 3px;
  background-color: ${Color.White};
  margin: 0px 0px 5px 0px;
  display: flex;
  vertical-align: middle;
  align-items: center;
  justify-content: space-between;
  font-size: ${FontSize.SubHeader};
  padding-left: 10px;
  cursor: pointer;
`;

export default LibraryElement;
