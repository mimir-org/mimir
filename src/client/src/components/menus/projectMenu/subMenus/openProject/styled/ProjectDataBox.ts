import styled from "styled-components";
import { Color } from "../../../../../../compLibrary";

interface Props {
  isSelected: boolean;
}

const ProjectDataBox = styled.div<Props>`
  display: flex;
  height: auto;
  flex-direction: row;
  font-weight: ${(props) => (props.isSelected ? "bold" : "normal")};
  font-size: 12px;
  color: ${Color.Black};
  cursor: pointer;
  padding-top: 3px;
  padding-bottom: 3px;
  border-color: ${Color.BlueMagenta};
  border: ${(props) => (props.isSelected ? 1 : 0)}px solid;

  p {
    margin: 0px;
    white-space: nowrap;
  }

  .name {
    width: 45%;
  }

  .owner {
    width: 35%;
    margin-left: 10px;
  }

  .edited {
    width: 15%;
    margin-left: 10px;
  }

  &:hover {
    background: ${Color.LightBlue};
  }

  &:nth-of-type(even) {
    background: ${Color.LightPurple};
  }
`;

export default ProjectDataBox;
