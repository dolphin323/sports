interface AthleteRaw {
  _id: string;
  _index: string;
  _score: string;
  _source: {
    "@timestamp": string;
    dateOfBirth: string;
    isActive: boolean;
    name: string;
    surname: string;
    successfulGames: number;
  };
}

interface Athlete {
  id: string;
  dateOfBirth: string;
  isActive: boolean;
  name: string;
  surname: string;
  successfulGames: number;
}

export { type AthleteRaw, type Athlete };
