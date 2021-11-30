import styled from "styled-components";
import { Color } from "../../../../../../compLibrary/colors";
import { FontSize } from "../../../../../../compLibrary/font";

interface Props {
  isSelected: boolean;
}

const ProjectDataBox = styled.div<Props>`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 30px;
  padding: 0px 10px 0px 8px;
  font-weight: ${(props) => (props.isSelected ? "bold" : "normal")};
  text-decoration: ${(props) => (props.isSelected ? "underline" : "none")};
  font-size: ${FontSize.Small};
  color: ${Color.Black};
  cursor: pointer;

  p {
    white-space: nowrap;
  }

  .name {
    padding-left: 22px;
    width: 31%;
  }

  .owner {
    width: 29%;
  }

  .version {
    text-align: center;
    width: 28%;
  }

  .edited {
    text-align: right;
    width: 12%;
  }

  &:nth-of-type(odd) {
    background: ${Color.LightPurple};
  }

  &:hover {
    background: ${Color.LightBlue};
  }
`;

export default ProjectDataBox;
