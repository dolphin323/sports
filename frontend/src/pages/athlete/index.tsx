import dayjs from "dayjs";
import React, { useEffect, useState } from "react";

import { AthleteService } from "../../api/athlete";
import { Athlete } from "../../api/athlete/types";

function CreateAthlete() {
  const [athlete, setAthlete] = useState<Omit<Athlete, "id">>({
    dateOfBirth: "",
    isActive: false,
    name: "",
    surname: "",
    successfulGames: 0,
  });

  const addAthlete = async () => {
    if (athlete) {
      await AthleteService.add(athlete);
    }
  };

  const handleInputChange = (event: any) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    setAthlete((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <form>
        <label>
          Is active:
          <input
            name="isActive"
            type="checkbox"
            checked={athlete?.isActive}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Name:
          <input
            name="name"
            type="string"
            value={athlete?.name}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Surname:
          <input
            name="surname"
            type="string"
            value={athlete?.surname}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Successful games:
          <input
            name="successfulGames"
            type="number"
            value={athlete?.successfulGames}
            onChange={handleInputChange}
            min={0}
          />
        </label>
        <br />
        <label>
          Date of birth:
          <input
            name="dateOfBirth"
            type={"date"}
            value={athlete?.dateOfBirth}
            onChange={handleInputChange}
            max={dayjs(new Date()).format("YYYY-MM-DD")}
          />
        </label>
      </form>
      <button onClick={addAthlete}>Add</button>
    </div>
  );
}

export { CreateAthlete };
