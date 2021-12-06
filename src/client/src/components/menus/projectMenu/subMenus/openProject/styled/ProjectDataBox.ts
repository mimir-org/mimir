import styled from "styled-components";
import { Color } from "../../../../../../compLibrary/colors";
import { FontSize, FontWeight } from "../../../../../../compLibrary/font";

interface Props {
  isSelected: boolean;
}

const ProjectDataBox = styled.div<Props>`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 30px;
  padding: 0px 10px 0px 6px;
  font-weight: ${(props) => (props.isSelected ? FontWeight.Bold : FontWeight.Normal)};
  text-decoration: ${(props) => props.isSelected && "underline"};
  font-size: ${FontSize.Small};
  color: ${Color.Black};
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
    background: ${Color.PurpleLight};
  }

  &:hover {
    background: ${Color.BlueLight};
  }

  /* .owner,
  .name,
  .edited {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    word-wrap: break-word;
  } */
`;

export default ProjectDataBox;
