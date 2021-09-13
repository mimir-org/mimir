import styled from "styled-components";
import { Color, FontSize } from "../../../compLibrary";

const ListElement = styled.div`
  padding: 10px;
  min-width: 250px;
  font-size: ${FontSize.Medium};
  display: flex;
  background-color: ${(props) => props.color};
  border-bottom: 1px solid ${Color.ListBorder};

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
