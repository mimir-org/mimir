import styled from "styled-components";
import { Color, FontSize, FontType } from "..";

const ProjectButton = styled.button`
  width: 90px;
  height: 34px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background: ${Color.LightGrey};
  border: 1px solid ${Color.DeepCyan};
  border-radius: 2px;
  padding: 0px 6px;
  cursor: pointer;
  font-family: ${FontType.Standard};
  font-size: ${FontSize.Standard};
  color: ${Color.Black};
  margin: 10px 0px;

  &:hover {
    border: 2px solid ${Color.DeepCyan};
    text-decoration: underline;
  }
`;

export default ProjectButton;
