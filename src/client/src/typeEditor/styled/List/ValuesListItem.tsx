import styled from "styled-components";
import { Color } from "../../../compLibrary";

const ValuesListItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-width: 1px 0px 0px 0px;
  border-color: ${Color.DarkerGrey};
  border-style: solid;
  border-radius: 2px;
  height: 20px;
  padding: 2px;

  label::first-letter {
    text-transform: uppercase;
  }

  :hover {
    background-color: ${Color.LightBlue};
  }
`;

export default ValuesListItem;
