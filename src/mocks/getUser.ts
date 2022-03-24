import { User } from "../entities/User";

const mockGetUserUseCaseResponse: User = {
  id: "d95e94d4-d030-4ae8-9051-3ce17be00414",
  name: "Roseli",
  email: "rose@hotmail.com",
  birthDate: new Date("2000-08-05"),
  userName: "roselibarbosa",
};

const payloadMock = {
  id: "d95e94d4-d030-4ae8-9051-3ce17be00414",
};

const mockUpdateUserUseCaseError = {
  id: "d95e94d4-d030-4ae8-9051-3ce17be00414",
  name: "Rosemara",
  email: "rosemara@hotmail.com",
  birthDate: new Date("2000-08-05"),
  userName: "rosemara",
};

const mockUpdateUserUseCase = {
  name: "Rosemara",
  email: "rosemara@hotmail.com",
  birthDate: new Date("2000-08-05"),
  userName: "rosemara",
};

const mockUpdateUserUseCaseResponse: User = {
  id: "d95e94d4-d030-4ae8-9051-3ce17be00414",
  name: "Rosemara",
  email: "rosemara@hotmail.com",
  birthDate: new Date("2000-08-05"),
  userName: "rosemara",
};

export {
  mockGetUserUseCaseResponse,
  payloadMock,
  mockUpdateUserUseCaseResponse,
  mockUpdateUserUseCase,
  mockUpdateUserUseCaseError,
};
