const FragmentContent = ({ data }) => {
  return (
    <>
      {data.map((data) => (
        <p key={data.type}>{data.type}</p>
      ))}
    </>
  );
};

export default FragmentContent;
