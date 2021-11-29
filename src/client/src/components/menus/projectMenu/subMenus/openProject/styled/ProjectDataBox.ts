import styled from "styled-components";
import { Color } from "../../../../../../compLibrary/colors";
import { FontSize, FontWeight } from "../../../../../../compLibrary/font";

interface Props {
  isSelected: boolean;
}

const ProjectDataBox = styled.div<Props>`
  display: flex;
  align-items: center;
  height: 33px;
  font-weight: ${(props) => (props.isSelected ? FontWeight.Bold : FontWeight.Normal)};
  text-decoration: ${(props) => props.isSelected && "underline"};
  font-size: ${FontSize.Medium};
  line-height: 1.5;
  color: ${Color.Black};
  cursor: pointer;
  border-color: ${Color.BlueMagenta};

  .owner,
  .name,
  .edited {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    word-wrap: break-word;
  }

  .name {
    width: 270px;
    margin: 0px 7px 0px 3px;
  }

  .owner {
    width: 200px;
  }

  .edited {
    width: 115px;
    margin: 0px 0px 0px 12px;
  }

  &:hover {
    background: ${Color.BlueLight};
  }

  &:nth-of-type(even) {
    background: ${Color.PurpleLight};
  }
`;

export default ProjectDataBox;
