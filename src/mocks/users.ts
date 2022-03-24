import { User } from "../entities/User";

const usersMock = [
  {
    id: "8c3765eb-6c83-4bb5-9653-464869d9ccaa",
    name: "Thaís Barbosa",
    email: "thaisbarbosa@hotmail.com",
    birthDate: "2000-06-07T03:00:00.000Z",
    userName: "thaisbarbosa",
  },
  {
    id: "d95e94d4-d030-4ae8-9051-3ce17be00414",
    name: "Roseli",
    email: "rose@hotmail.com",
    birthDate: "2000-08-05T03:00:00.000Z",
    userName: "roselibarbosa",
  },
  {
    id: "22d93b96-eee1-4571-b925-73f29373f6b9",
    name: "diego",
    email: "diego@hotmail.com",
    birthDate: "2000-08-04T03:00:00.000Z",
    userName: "diego",
  },
  {
    id: "873b6fe5-e59a-48ac-87e3-c6bffcfb81f3",
    name: "diego1",
    email: "diego1@hotmail.com",
    birthDate: "2000-08-04T03:00:00.000Z",
    userName: "diego1",
  },
];

const cleanUsersMock = [];

const usersMockSearch = [
  {
    id: "22d93b96-eee1-4571-b925-73f29373f6b9",
    name: "diego",
    email: "diego@hotmail.com",
    birthDate: "2000-08-04T03:00:00.000Z",
    userName: "diego",
  },
  {
    id: "873b6fe5-e59a-48ac-87e3-c6bffcfb81f3",
    name: "diego1",
    email: "diego1@hotmail.com",
    birthDate: "2000-08-04T03:00:00.000Z",
    userName: "diego1",
  },
];

export { usersMock, cleanUsersMock, usersMockSearch };
