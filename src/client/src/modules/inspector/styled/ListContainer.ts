import styled from "styled-components";
import { Color } from "../../../compLibrary";

const ListContainer = styled.div`
  border: solid 2px ${Color.DarkerGrey};
  border-radius: 3px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  height: 150px;
  min-width: 460px;
  overflow-y: scroll;
`;

export default ListContainer;
