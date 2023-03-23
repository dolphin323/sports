import { useEffect, useState } from "react";

import "./Home.css";

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

    console.log(res);
    setAthletes(res);
  };

  useEffect(() => {
    getAthletes();
  }, []);

  const deleteAthlete = async (id: string) => {
    // eslint-disable-next-line no-restricted-globals
    const answer = confirm("Are you sure that you want to delete?");
    if (answer) {
      const res = await AthleteService.delete(id);
      console.log(res);
      await getAthletes();
    }
  };

  return (
    <div>
      <Filter getAthletes={getAthletes} />
      <table className="table">
        <tbody>
          <tr className="table-header">
            <td>Name and Surname</td>
            <td>Date of birth</td>
            <td>Num of successful games</td>
            <td>Active sportsman</td>
            <td>Sports</td>
            <td>Biography</td>
            <td>Career description</td>
          </tr>
          {athletes.map((athlete) => (
            <tr key={athlete.id}>
              <td>
                {athlete.name} {athlete.surname}
              </td>
              <td>{athlete.dateOfBirth}</td>
              <td>{athlete.successfulGames}</td>
              <td>{athlete.isActive ? "True" : "False"}</td>
              <td>{athlete.sports}</td>
              <td>{athlete.biography}</td>
              <td>{athlete.careerDescription}</td>
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
