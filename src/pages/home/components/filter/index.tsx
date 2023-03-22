import dayjs from "dayjs";
import { useState } from "react";
import { Filter as FilterType } from "../../types";

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

  return (
    <div>
      Filters
      <form>
        <label>
          Is active:
          <input
            name="isActive"
            type="checkbox"
            checked={filters?.isActive ?? false}
            onChange={handleFilterChange}
          />
        </label>
        <br />
        <label>
          Name:
          <input
            name="name"
            type="string"
            value={filters?.name ?? ""}
            onChange={handleFilterChange}
          />
        </label>
        <br />
        <label>
          Surname:
          <input
            name="surname"
            type="string"
            value={filters?.surname ?? ""}
            onChange={handleFilterChange}
          />
        </label>
        <br />
        <label>
          Successful games:
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
          Date of birth:
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
      </form>
      <button onClick={handleFiltersApply}>Apply</button>
      <button onClick={removeFilters}>Remove filters</button>
    </div>
  );
}

export { Filter };
