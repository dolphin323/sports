interface Filter {
  name?: string;
  surname?: string;
  successfulGamesMin?: number;
  successfulGamesMax?: number;
  isActive?: boolean;
  dateOfBirthMin?: string;
  dateOfBirthMax?: string;
}

export { type Filter };
