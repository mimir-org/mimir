import styled from "styled-components";

interface ToolbarParentContainer {
  bgColor: string;
}

export const ToolbarParentContainer = styled.div<ToolbarParentContainer>`
  flex: 1;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  align-items: center;
  background-color: ${(props) => props.bgColor};
`;
