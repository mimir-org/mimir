import styled from "styled-components";
import { Color } from "../../../../../../../compLibrary/colors/Color";
import { FontSize, FontWeight } from "../../../../../../../compLibrary/font";

interface ProjectDataBoxProps {
  isSelected: boolean;
}

export const ProjectDataBox = styled.button<ProjectDataBoxProps>`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 33px;
  padding: 0 10px 0 6px;
  font-weight: ${(props) => (props.isSelected ? FontWeight.BOLD : FontWeight.NORMAL)};
  text-decoration: ${(props) => props.isSelected && "underline"};
  font-size: ${FontSize.SMALL};
  color: ${Color.BLACK};
  border: none;
  background: transparent;
  cursor: pointer;

  span {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .name {
    width: 40%;
    text-align: left;
  }

  .owner {
    width: 20%;
  }

  .version {
    text-align: center;
    width: 25%;
  }

  .edited {
    text-align: right;
    width: 15%;
  }

  &:nth-of-type(odd) {
    background: ${Color.LAVANDER_WEB_LIST};
  }

  &:hover {
    background: ${Color.LAVANDER_WEB_HOVER};
  }
`;
