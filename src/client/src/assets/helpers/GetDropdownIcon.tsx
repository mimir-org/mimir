const GetDropdownIcon = (expandIcon: string, handleExpandClick: () => void) => {
  return (
    <img
      className="expandIcon"
      src={expandIcon}
      alt="expand-icon"
      onClick={handleExpandClick}
    ></img>
  );
};

export default GetDropdownIcon;
