import styled from "styled-components";
import { Color, FontSize } from "../../";

const LibraryElement = styled.div`
  width: 294px;
  height: 41px;
  border: 1px solid ${Color.DarkerGrey};
  border-radius: 3px;
  background-color: ${Color.White};
  margin: 0px 0px 5px 0px;
  display: inline-flex;
  align-items: center;
  font-size: ${FontSize.SubHeader};
  padding-left: 10px;

  .icon {
    display: inline-flex;
    right: 32px;
    position: absolute;
  }
`;

export default LibraryElement;
