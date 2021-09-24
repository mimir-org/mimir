import styled from "styled-components";

const TabColumn = styled.div`
  width: ${(props: { width: number }) => getWidth(props.width)};
  height: 100%;
  padding: 10px;
  padding-left: 20px;
  font-size: 12px;
  display: flex;
  flex-direction: column;
`;

const getWidth = (width: number): string => (width ? `${width}px` : "100%");

export default TabColumn;
