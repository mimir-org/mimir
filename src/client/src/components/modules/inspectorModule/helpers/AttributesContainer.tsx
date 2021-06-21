import styled from "styled-components";


const Wrapper = styled.div`
    //border: red solid 1px;
    display: flex;
    flex-direction: column;
    margin: 10px;
    height: 160px;
    width: 250px;
`;


const AttributesContainer = ({ attributes }) => {
  console.log(attributes)
  return (
    <Wrapper>
        {attributes.map((a)=> <div>{a.name}</div>)}
    </Wrapper>
  );
};

export default AttributesContainer;
