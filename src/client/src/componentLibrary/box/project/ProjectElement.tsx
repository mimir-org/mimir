import styled from "styled-components";
import { Color } from "./../../../componentLibrary";

const ProjectElement = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 14px 0px 30px 0px;
  z-index: 1200;
  cursor: pointer;
  /* padding-right: 40px; */
  border-radius: 5px;

  .icon {
    padding: 12px;
    width: 32px;
    height: 32px;
    background-color: ${Color.DeepCyan};
    border-radius: 5px;
  }

  &:hover {
    text-decoration: underline;
    background-color: ${Color.DeepCyan};
    color: ${Color.White};
  }
`;

export default ProjectElement;
