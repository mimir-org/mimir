import styled from "styled-components";

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: ${(props: { blockPaddingTop: number }) =>
    props.blockPaddingTop + `px`};

  p {
    text-align: center;
    margin: 2px 0px;
  }
`;

export default InfoWrapper;
