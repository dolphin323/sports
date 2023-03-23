interface Filter {
  name?: string;
  surname?: string;
  successfulGamesMin?: number;
  successfulGamesMax?: number;
  isActive?: boolean;
  dateOfBirthMin?: string;
  dateOfBirthMax?: string;
  sports?: string;
  biography?: string;
  careerDescription?: string;
}

export { type Filter };
