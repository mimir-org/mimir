import styled from "styled-components";

const LibraryBody = styled.div`
  position: fixed;
  margin-left: 15px;
  width: 306px;
  height: auto;
  overflow-y: scroll;
  overflow-x: hidden;
  padding-right: 10px;
  max-height: ${(props) => (props.legend ? "60%" : "80%")};

  @media screen and (max-height: 1100px) {
    max-height: ${(props) => (props.legend ? "50%" : "75%")};
  }

  @media screen and (max-height: 1000px) {
    max-height: ${(props) => (props.legend ? "40%" : "70%")};
  }

  @media screen and (max-height: 900px) {
    max-height: ${(props) => (props.legend ? "30%" : "65%")};
  }

  @media screen and (max-height: 700px) {
    max-height: ${(props) => (props.legend ? "20%" : "55%")};
  }

  @media screen and (max-height: 550px) {
    max-height: ${(props) => (props.legend ? "10%" : "40%")};
  }

  @media screen and (max-height: 400px) {
    max-height: ${(props) => (props.legend ? "5%" : "25%")};
  }
`;

export default LibraryBody;
