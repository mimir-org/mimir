import styled from "styled-components";
import { Color, FontSize } from "../../";

const LibraryElement = styled.div`
  width: 286px;
  height: 36px;
  border: 1px solid ${Color.DarkerGrey};
  border-radius: 3px;
  background-color: ${Color.White};
  margin: 0px 0px 5px 0px;
  display: flex;
  vertical-align: middle;
  align-items: center;
  justify-content: space-between;
  font-size: ${FontSize.SubHeader};
  padding-left: 10px;
`;

export default LibraryElement;
