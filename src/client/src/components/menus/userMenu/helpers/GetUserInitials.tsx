const GetUserInititals = (userName: string) => {
  const userNameSplit = userName.split(" ");

  const firstInitial = userNameSplit[0].substring(0, 1);
  const lastInitial = userNameSplit[1].substring(0, 1);

  return firstInitial + lastInitial;
};

export default GetUserInititals;
