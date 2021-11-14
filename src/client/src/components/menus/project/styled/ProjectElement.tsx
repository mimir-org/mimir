import styled from "styled-components";
import { Color } from "./../../../../compLibrary";

const ProjectElement = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 14px 0px 30px 0px;
  cursor: pointer;
  padding-right: 50px;
  border-radius: 5px;

  .icon {
    padding: 12px;
    width: 32px;
    height: 32px;
    background-color: ${Color.BlueMagenta};
    border-radius: 5px;
  }

  &:hover {
    text-decoration: underline;
    background-color: ${Color.BlueMagenta};
    color: ${Color.White};
  }
`;

export default ProjectElement;
