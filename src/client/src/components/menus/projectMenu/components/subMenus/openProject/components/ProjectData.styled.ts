import styled from "styled-components";
import { Color } from "../../../../../../../compLibrary/colors/Color";
import { FontSize, FontWeight } from "../../../../../../../compLibrary/font";

interface ProjectDataBoxProps {
  isSelected: boolean;
}

export const ProjectDataBox = styled.div<ProjectDataBoxProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 30px;
  padding: 0 10px 0 6px;
  font-weight: ${(props) => (props.isSelected ? FontWeight.BOLD : FontWeight.NORMAL)};
  text-decoration: ${(props) => props.isSelected && "underline"};
  font-size: ${FontSize.SMALL};
  color: ${Color.BLACK};
  cursor: pointer;

  p {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .name {
    width: 40%;
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
    background: ${Color.PURPLE_LIGHT};
  }

  &:hover {
    background: ${Color.BLUE_LIGHT};
  }
`;
