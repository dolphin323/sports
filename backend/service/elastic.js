const { Client } = require("@elastic/elasticsearch");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

const { ELASTIC_CLOUD_ID, ELASTIC_USERNAME, ELASTIC_PASSWORD } = process.env;

const defaultAthletes = [
  {
    isActive: true,
    successfulGames: 27,
    name: "Abby",
    surname: "Dyer",
    dateOfBirth: "2021-11-24",
    sports: "Basketball, Cricket, Tennis",
    biography:
      "She was born in an average family in a normal capital. She lived out of trouble until she was about 17 years old, but at that point things changed.",
    careerDescription:
      "Professional basketball player: A skilled athlete who excels in the sport of basketball, competing at the highest level in leagues around the world.",
  },
  {
    isActive: false,
    successfulGames: 8,
    name: "Stewart",
    surname: "Cameron",
    dateOfBirth: "2019-03-03",
    sports: "Badminton, Curling",
    biography:
      "He was born in an ordinary family in a merchant capital. He lived free of trouble until he was about 13 years old, but at that point life changed.",
    careerDescription:
      "Olympic swimmer: A highly trained athlete who competes in swimming events at the Olympic level, pushing their physical and mental limits to achieve gold medal performances. :)",
  },
  {
    isActive: true,
    successfulGames: 4,
    name: "Mccoy",
    surname: "Carlson",
    dateOfBirth: "2021-07-07",
    sports: "Cricket, Badminton, Football",
    biography:
      "He was born in a royal family in an average town. He lived out of trouble until he was about 18 years old, but at that point life changed.",
    careerDescription:
      "Pro football quarterback: The leader of the offense :(, responsible for directing the team on the field and making split-second decisions that can make or break a game.",
  },
  {
    isActive: false,
    successfulGames: 22,
    name: "Parks",
    surname: "Fitzpatrick",
    dateOfBirth: "2022-02-27",
    sports: "Swimming, Basketball, Tennis, Golf",
    biography:
      "She was born in a middle class family in a developed village. She lived happily until she was about 11 years old, but at that point things began to change.",
    careerDescription:
      "Professional golfer: A talented athlete who spends countless hours perfecting their swing and mastering the intricacies of the game, competing against the best in the world on the PGA Tour.",
  },
  {
    isActive: false,
    successfulGames: 26,
    name: "Bertha",
    surname: "Marshall",
    dateOfBirth: "2018-11-29",
    sports: "Boxing, Golf, Running",
    biography:
      "She was born in a high class family in a developed city. She lived happily until she was about 12 years old, but at that point life began to change.",
    careerDescription:
      "Track and field athlete: A versatile competitor who excels in running, jumping, and throwing events, showcasing their athleticism and endurance on the world stage.",
  },
  {
    isActive: true,
    successfulGames: 27,
    name: "Eliza",
    surname: "Beach",
    dateOfBirth: "2021-02-22",
    sports: "Football, Tennis, Soccer",
    biography:
      "He was born in a wealthy family in a developed village. He lived free of trouble until he was about 13 years old, but at that point things began to change.",
    careerDescription:
      "Pro soccer player: A skilled athlete who combines technique, speed, and strategy to score goals and lead their team to victory on the pitch.",
  },
  {
    isActive: false,
    successfulGames: 25,
    name: "Simon",
    surname: "Bates",
    dateOfBirth: "2023-03-22",
    sports: "Golf, Swimming",
    biography:
      "He was born in an ordinary family in a developed community. He lived happily until he was about 14 years old, but at that point life changed.",
    careerDescription:
      "NFL linebacker: A fierce defender who uses their strength and agility to disrupt the opposing team's offense and make crucial tackles.",
  },
  {
    isActive: false,
    successfulGames: 11,
    name: "Roberts",
    surname: "Matthews",
    dateOfBirth: "2019-06-18",
    sports: "Basketball, Golf, Tennis, Box",
    biography:
      "He was born in a high class family in a developing town. He lived out of trouble until he was about 16 years old, but at that point life changed.",
    careerDescription:
      "Professional boxer: A fighter who puts their body on the line in the ring, using their speed, power, and endurance to outsmart and out-punch their opponents.",
  },
  {
    isActive: true,
    successfulGames: 28,
    name: "Fox",
    surname: "Maynard",
    dateOfBirth: "2020-09-14",
    sports: "Swimming, Tennis",
    biography:
      "She was born in a middle class family in a developing community. She lived without worry until she was about 11 years old, but at that point life began to change.",
    careerDescription:
      "Tennis pro: A master of the court who combines precision, finesse, and power to dominate their opponents and win grand slam titles.",
  },
  {
    isActive: false,
    successfulGames: 22,
    name: "Rosalyn",
    surname: "Brewer",
    dateOfBirth: "2022-05-04",
    sports: "Football, Tennis, Boxing",
    biography:
      "She was born in a wealthy family in an average port. She lived out of trouble until she was about 14 years old, but at that point things began to change.",
    careerDescription:
      "Olympic gymnast: A gymnastics expert who defies gravity with acrobatic moves on the balance beam, vault, uneven bars, and floor, dazzling audiences with their skill and athleticism.",
  },
];

class Elastic {
  INDEX = "athletes";
  client;
  constructor() {
    const client = new Client({
      cloud: {
        id: ELASTIC_CLOUD_ID,
      },
      auth: {
        username: ELASTIC_USERNAME,
        password: ELASTIC_PASSWORD,
      },
    });

    this.client = client;
  }

  async get(query) {
    const athletes = await this.client.search({
      index: this.INDEX,
      query,
      size: 100,
    });

    return athletes;
  }

  async getById(id) {
    const athlete = await this.client.getSource({ index: this.INDEX, id });

    return athlete;
  }

  async create(document) {
    const athlete = await this.client.create({
      id: uuidv4(),
      index: this.INDEX,
      document,
    });

    return athlete;
  }

  async deleteById(id) {
    const res = await this.client.delete({ index: this.INDEX, id });
    await this.client.indices.refresh({ index: this.INDEX });
    return res;
  }

  async initialize() {
    const exists = await this.client.indices.exists({ index: this.INDEX });

    if (exists) {
      return "Index already exists";
    }

    const properties = {
      name: { type: "keyword" },
      surname: { type: "keyword" },
      isActive: { type: "boolean" },
      dateOfBirth: { type: "date", format: "date" },
      successfulGames: { type: "integer" },
      sports: { type: "text", analyzer: "standard" },
      biography: { type: "text", analyzer: "english" },
      careerDescription: { type: "text", analyzer: "custom_analyzer" },
    };

    await this.client.indices.create({
      index: this.INDEX,
      mappings: {
        properties,
      },
      settings: {
        analysis: {
          analyzer: {
            custom_analyzer: {
              type: "custom",
              tokenizer: "standard",
              filter: ["lowercase"],
              char_filter: ["emoji_char_filter"],
            },
          },
          char_filter: {
            emoji_char_filter: {
              type: "mapping",
              mappings: [":) => _happy_", ":( => _sad_"],
            },
          },
        },
      },
    });

    const results = [];

    for (const athlete of defaultAthletes) {
      const result = await this.create(athlete);

      results.push(result);
    }

    return results;
  }
}

const ElasticService = new Elastic();

module.exports = { ElasticService };
