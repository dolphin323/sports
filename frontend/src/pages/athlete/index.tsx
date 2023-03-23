import dayjs from "dayjs";
import { useState } from "react";
import "./styles.css";

import { AthleteService } from "../../api/athlete";
import { Athlete } from "../../api/athlete/types";

const defaultAthlete: Omit<Athlete, "id"> = {
  dateOfBirth: "",
  isActive: false,
  name: "",
  surname: "",
  successfulGames: 0,
  sports: "",
  biography: "",
  careerDescription: "",
};

function CreateAthlete() {
  const [athlete, setAthlete] = useState<Omit<Athlete, "id">>(defaultAthlete);

  const addAthlete = async () => {
    if (athlete) {
      await AthleteService.add(athlete);
      alert("Successfully added!");
      setAthlete(defaultAthlete);
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
    <div className="container">
      <form className="form">
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
          Name:{" "}
          <input
            name="name"
            type="string"
            value={athlete?.name}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Surname:{" "}
          <input
            name="surname"
            type="string"
            value={athlete?.surname}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Sports:{" "}
          <input
            name="sports"
            type="string"
            value={athlete?.sports ?? ""}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Biography:{" "}
          <textarea
            name="biography"
            value={athlete?.biography ?? ""}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Career description:{" "}
          <textarea
            name="careerDescription"
            value={athlete?.careerDescription ?? ""}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Successful games:{" "}
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
          Date of birth:{" "}
          <input
            name="dateOfBirth"
            type={"date"}
            value={athlete?.dateOfBirth}
            onChange={handleInputChange}
            max={dayjs(new Date()).format("YYYY-MM-DD")}
          />
        </label>
      </form>
      <button onClick={addAthlete} className={"button"}>
        Add
      </button>
    </div>
  );
}

export { CreateAthlete };
