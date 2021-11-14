import styled from "styled-components";
import { Color } from "../../../compLibrary";
import { FontSize } from "../../../compLibrary/font";

interface Props {
  color: string;
}

const ListElement = styled.div<Props>`
  padding: 5px 10px;
  min-width: 230px;
  height: 20px;
  font-size: ${FontSize.Medium};
  display: flex;
  align-items: center;
  background-color: ${(props) => props.color};
  border-bottom: 1px solid ${Color.DarkGrey};

  .icon {
    display: flex;
    margin-left: auto;
  }

  :hover {
    background-color: ${Color.LightBlue};
    cursor: pointer;
    text-decoration: underline;
  }
  :first-child {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
  :last-child {
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    border-bottom: none;
  }
`;

export default ListElement;
