import styled from "styled-components";

const LegendWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 45%;
  border: ${(props: { visible: boolean }) =>
    props.visible ? "1px solid #cbcbcb" : "none"};
`;

export default LegendWrapper;
