import styled from "styled-components";
import { Color } from "../../../compLibrary/colors/Color";

interface Props {
  gap?: string;
}

const ValuesListItem = styled.label<Props>`
  display: flex;
  align-items: center;
  gap: ${(props) => (props.gap ? props.gap : "10px")};
  padding: 2px 5px;
  border-bottom: 1px solid ${Color.GREY};
  border-radius: 3px;
  height: 20px;

  :last-child {
    border: 0;
  }

  :hover {
    background-color: ${Color.LAVANDER_WEB_HOVER};
    text-decoration: underline;
  }
`;

export default ValuesListItem;
