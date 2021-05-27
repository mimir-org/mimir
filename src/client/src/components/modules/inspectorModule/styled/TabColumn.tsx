import styled from "styled-components";

const TabColumn = styled.div`
  padding: 15px 15px 15px 15px;
  width: 100%;
  font-size: 14px;
  font-size: ${(props: { fontSize: string }) =>
    props.fontSize ? `${props.fontSize}px` : "14px"};
`;

export default TabColumn;
