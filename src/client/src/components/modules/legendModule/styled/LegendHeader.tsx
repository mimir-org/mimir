import styled from "styled-components";

const LegendHeader = styled.div`
  flex-direction: row;
  justify-content: center;
  font-family: roboto;
  color: #000;
  font-size: 18px;
  display: inline-flex;
  align-items: center;
  margin: 18px 0px 0px 28px;
  visibility: ${(props: { visible: boolean }) =>
    props.visible ? "initial" : "hidden"};
`;

export default LegendHeader;
