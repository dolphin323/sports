import { useEffect, useState } from "react";

import { AthleteService } from "../../api/athlete";
import { Athlete } from "../../api/athlete/types";
import { Filter } from "./components/filter";
import { Filter as FilterType } from "./types";

function Home() {
  const [athletes, setAthletes] = useState<Athlete[]>([]);

  const getAthletes = async (filters?: FilterType) => {
    const res = await (filters
      ? AthleteService.getAllFiltered(filters)
      : AthleteService.getAll());
    setAthletes(res);
  };

  useEffect(() => {
    getAthletes();
  }, []);

  const deleteAthlete = async (id: string) => {
    await AthleteService.delete(id);
    await getAthletes();
  };

  return (
    <div>
      <Filter getAthletes={getAthletes} />
      <table>
        <tbody>
          {athletes.map((athlete) => (
            <tr key={athlete.id}>
              <td>
                {athlete.name} {athlete.surname}
              </td>
              <td>{athlete.dateOfBirth}</td>
              <td>{athlete.isActive}</td>
              <td>{athlete.successfulGames}</td>
              <td>{athlete.isActive ? "True" : "False"}</td>
              <td>
                <button onClick={() => deleteAthlete(athlete.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export { Home };
