import styled from "styled-components";
import { Color } from "../../../../compLibrary";

const ValuesListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px 15px 0px 5px;
  border-width: 0px 1px 1px 1px;
  border-color: ${Color.DarkerGrey};
  border-style: solid;
  border-radius: 2px;
  position: absolute;
  top: 27px;
  left: 0;
  right: 0;
  z-index: 1;
  background-color: ${Color.White};
`;

export default ValuesListWrapper;
