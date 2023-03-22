import { mapAthleteFromApi } from "../../mapper/athlete";
import { Filter } from "../../pages/home/types";
import { Athlete, AthleteRaw } from "./types";

class AthleteApi {
  private readonly baseUrl: string;

  constructor() {
    this.baseUrl = "http://0.0.0.0:3000/";
  }

  async getAll() {
    const res = await fetch("http://0.0.0.0:3000/");
    const athletes: AthleteRaw[] = await res.json();
    return athletes.map((athlete) => mapAthleteFromApi(athlete));
  }

  async getAllFiltered(filters: Filter) {
    const queryString = new URLSearchParams(
      filters as Record<string, any>
    ).toString();
    console.log(queryString);
    const res = await fetch(`http://0.0.0.0:3000/?${queryString}`);
    const athletes: AthleteRaw[] = await res.json();
    return athletes.map((athlete) => mapAthleteFromApi(athlete));
  }

  async add(athlete: Omit<Athlete, "id">) {
    await fetch("http://0.0.0.0:3000/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(athlete),
    });
  }
  async delete(id: string) {
    await fetch(`http://0.0.0.0:3000/${id}`, {
      method: "DELETE",
    });
  }
}

const AthleteService = new AthleteApi();

export { AthleteService };
