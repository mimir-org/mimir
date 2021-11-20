import { CreateLibraryType, Rds } from "../../models";

const GetSelectedRds = (createLibraryType: CreateLibraryType, rds: Rds[]): Rds => {
  let selectedRds: Rds = rds.find((r) => r.id === createLibraryType?.rdsId);
  return selectedRds;
};

export default GetSelectedRds;
