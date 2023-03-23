import dayjs from "dayjs";
import { useState } from "react";
import { Filter as FilterType } from "../../types";
import "./Filter.css";

function Filter({ getAthletes }: { getAthletes: any }) {
  const [filters, setFilters] = useState<FilterType | null>(null);

  const handleFilterChange = (event: any) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    setFilters((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFiltersApply = () => {
    if (filters) {
      getAthletes(filters);
    }
  };

  const removeFilters = () => {
    setFilters(null);
    getAthletes();
  };

  console.log(filters);

  return (
    <div className="filter">
      Filters
      <form className="filter-form">
        <label
          style={{
            flexDirection: "row",
            display: "flex",
            alignItems: "center",
          }}
        >
          Is active:{" "}
          <input
            name="isActive"
            type="checkbox"
            checked={filters?.isActive ?? false}
            onChange={handleFilterChange}
          />
          {filters?.isActive !== undefined && (
            <span>
              <p>{filters.isActive ? "True" : "False"}</p>
              {/* <button
                onClick={() => {
                  setFilters({ ...filters, isActive: undefined });
                }}
              >
                remove
              </button> */}
            </span>
          )}
        </label>
        <br />
        <label>
          Name:{" "}
          <input
            name="name"
            type="string"
            value={filters?.name ?? ""}
            onChange={handleFilterChange}
          />
        </label>
        <br />
        <label>
          Surname:{" "}
          <input
            name="surname"
            type="string"
            value={filters?.surname ?? ""}
            onChange={handleFilterChange}
          />
        </label>
        <br />
        <label>
          Successful games:{" "}
          <input
            name="successfulGamesMin"
            type="number"
            value={filters?.successfulGamesMin ?? ""}
            onChange={handleFilterChange}
            min={0}
          />
          -
          <input
            name="successfulGamesMax"
            type="number"
            value={filters?.successfulGamesMax ?? ""}
            onChange={handleFilterChange}
            min={0}
          />
        </label>
        <br />
        <label>
          Date of birth:{" "}
          <input
            name="dateOfBirthMin"
            type={"date"}
            value={filters?.dateOfBirthMin ?? ""}
            onChange={handleFilterChange}
            max={dayjs(new Date()).format("YYYY-MM-DD")}
          />
          -
          <input
            name="dateOfBirthMax"
            type={"date"}
            value={filters?.dateOfBirthMax ?? ""}
            onChange={handleFilterChange}
            max={dayjs(new Date()).format("YYYY-MM-DD")}
          />
        </label>
        <br />
        <label>
          Sports:{" "}
          <input
            name="sports"
            type="string"
            value={filters?.sports ?? ""}
            onChange={handleFilterChange}
          />
        </label>
        <br />
        <label>
          Biography:{" "}
          <input
            name="biography"
            type="string"
            value={filters?.biography ?? ""}
            onChange={handleFilterChange}
          />
        </label>
        <br />
        <label>
          Career description:{" "}
          <input
            name="careerDescription"
            type="string"
            value={filters?.careerDescription ?? ""}
            onChange={handleFilterChange}
          />
        </label>
      </form>
      <button onClick={handleFiltersApply} className="button">
        Apply
      </button>
      <button onClick={removeFilters} className="button">
        Remove filters
      </button>
    </div>
  );
}

export { Filter };
