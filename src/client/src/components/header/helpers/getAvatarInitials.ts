export default function getAvatarInitials(userName: string): string {
  const userNameSplit = userName?.split(" ");
  let initials = "";

  if (userNameSplit) {
    const firstInitial = userNameSplit[0]?.substring(0, 1);
    if (firstInitial) initials = firstInitial;
    const lastInitial = userNameSplit[1]?.substring(0, 1);
    if (lastInitial) initials += lastInitial;
  }

  return initials;
}
