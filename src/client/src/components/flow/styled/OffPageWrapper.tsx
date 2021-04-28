import styled from "styled-components";

const OffPageWrapper = styled.div`
  width: 100px;
  height: 40px;
  background: ${(props: { background: string; fontColor: string }) =>
    props.background};
  text-align: center;
  vertical-align: middle;
  line-height: 40px;
  color: ${(props: { background: string; fontColor: string }) =>
    props.fontColor};

  &:before {
    content: "";
    position: absolute;
    right: -20px;
    bottom: 0;
    width: 0;
    height: 0;
    border-left: 20px solid
      ${(props: { background: string; fontColor: string }) => props.background};
    border-top: 20px solid transparent;
    border-bottom: 20px solid transparent;
  }
`;

export default OffPageWrapper;
