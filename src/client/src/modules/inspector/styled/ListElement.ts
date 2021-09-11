import styled from "styled-components";
import { FontSize } from "../../../compLibrary";

const ListElement = styled.div`
  width: 180px;
  margin: 10px;
  font-size: ${FontSize.Medium};
  display: flex;
  flex-wrap: wrap;
  border: solid 1px #898787;
  border-radius: 1px;
`;

export default ListElement;
