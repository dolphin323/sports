import { Athlete, AthleteRaw } from "../../api/athlete/types";

const mapAthleteFromApi = (athlete: AthleteRaw): Athlete => {
  const info = athlete._source;
  return {
    id: athlete._id,
    dateOfBirth: info.dateOfBirth,
    isActive: info.isActive,
    name: info.name,
    surname: info.surname,
    successfulGames: info.successfulGames,
    sports: info.sports,
    biography: info.biography,
    careerDescription: info.careerDescription,
  };
};

export { mapAthleteFromApi };
