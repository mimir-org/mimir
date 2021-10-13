import { Discipline, Purpose } from "../../models";

const GetSelectedDiscipline = (selectedPurpose: string, purposes: Purpose[]): Discipline => {
  if (!selectedPurpose) return Discipline.None;
  const purpose = purposes?.find((p) => p.id === selectedPurpose);
  return purpose.discipline;
};

export default GetSelectedDiscipline;
