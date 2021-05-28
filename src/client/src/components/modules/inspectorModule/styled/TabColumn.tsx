import styled from "styled-components";

const TabColumn = styled.div`
  padding: 10px;
  font-size: 14px;
  font-size: ${(props: { fontSize: string }) =>
    props.fontSize ? `${props.fontSize}px` : "14px"};
  width: 100%;
  min-width: 150px;
  display: flex;
  height: 180px;
  flex-direction: column;
  align-content: flex-start;
`;

export default TabColumn;
