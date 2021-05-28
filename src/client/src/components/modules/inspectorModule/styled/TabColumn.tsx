import styled from "styled-components";

const TabColumn = styled.div`
  padding: 10px;
  width: 100%;
  min-width: 174px;
  font-size: 14px;
  font-size: ${(props: { fontSize: string }) =>
    props.fontSize ? `${props.fontSize}px` : "14px"};
`;

export default TabColumn;
