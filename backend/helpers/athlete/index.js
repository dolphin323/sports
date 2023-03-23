const {
  CreateResponse,
  MappingProperty,
  QueryDslQueryContainer,
} = require("@elastic/elasticsearch/lib/api/types");

function getQuery(filters) {
  const query = {
    bool: {
      must: [],
    },
  };

  const pushQuery = (q) => {
    query.bool.must.push(q);
  };

  if (filters.name) {
    pushQuery({
      wildcard: {
        name: {
          value: `*${filters.name}*`,
          case_insensitive: true,
        },
      },
    });
  }

  if (filters.surname) {
    pushQuery({
      wildcard: {
        surname: {
          value: `*${filters.surname}*`,
          case_insensitive: true,
        },
      },
    });
  }

  if (
    filters.successfulGamesMin !== undefined ||
    filters.successfulGamesMax !== undefined
  ) {
    pushQuery({
      range: {
        successfulGames: {
          gte: filters.successfulGamesMin,
          lte: filters.successfulGamesMax,
        },
      },
    });
  }

  if (filters.isActive !== undefined) {
    pushQuery({
      term: {
        isActive: filters.isActive,
      },
    });
  }

  if (
    filters.dateOfBirthMin !== undefined ||
    filters.dateOfBirthMax !== undefined
  ) {
    pushQuery({
      range: {
        dateOfBirth: {
          format: "date",
          gte: filters.dateOfBirthMin,
          lte: filters.dateOfBirthMax,
        },
      },
    });
  }

  if (filters.sports !== undefined) {
    pushQuery({
      match: {
        sports: filters.sports,
      },
    });
  }

  if (filters.biography !== undefined) {
    pushQuery({
      match: {
        biography: filters.biography,
      },
    });
  }

  if (filters.careerDescription !== undefined) {
    pushQuery({
      match: {
        careerDescription: filters.careerDescription,
      },
    });
  }

  return query;
}

module.exports = { getQuery };
