import styled from "styled-components";
import { Color, FontSize } from "../../../compLibrary";

const ListElement = styled.div`
  padding: 10px;
  min-width: 250px;
  font-size: ${FontSize.Medium};
  display: flex;
  background-color: ${(props) => props.color};
  border-bottom: 1px solid ${Color.DarkGrey};

  text-decoration: ${(props) => (props.isSelected ? "underline" : "none")};
  font-weight: ${(props) => (props.isSelected ? "bold" : "normal")};

  .icon {
    display: flex;
    margin-left: auto;
  }

  .dropdownIcon {
    margin: auto 20px auto auto;
    width: 10px;
    height: 5px;
  }
  .numCategoryTerminals {
    padding-right: 10px;
  }

  :hover {
    background-color: ${Color.LightBlue};
    cursor: pointer;
    text-decoration: underline;
  }
  :first-child {
    border-top-left-radius: ${(props) => props.radius} px;
    border-top-right-radius: ${(props) => props.radius}px;
  }
  :last-child {
    border-bottom-left-radius: ${(props) => props.radius}px;
    border-bottom-right-radius: ${(props) => props.radius}px;
    border-bottom: none;
  }
`;

ListElement.defaultProps = {
  radius: 5,
};

export default ListElement;
