import styled from "styled-components";

const OffPageWrapper = styled.div`
  width: 25px;
  height: 14px;
  border-radius: 100% / 50%;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;

  background: ${(props: { background: string; fontColor: string }) =>
    props.background};
  color: ${(props: { background: string; fontColor: string }) =>
    props.fontColor};
`;

export default OffPageWrapper;
