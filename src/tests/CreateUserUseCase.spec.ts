import "../container";
import { mocked } from "jest-mock";
import { container } from "tsyringe";
import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { UserSavedMock } from "../mocks/user";
import { CreateUserUseCase } from "../usecases/CreateUserUseCase";
import { UserRepository } from "../repositories/implementations/UserRepository";
import { AppError } from "../Classes/AppError";

jest.mock("../repositories/implementations/UserRepository");

const mockUserPayload: ICreateUserDTO = {
  name: "Roseli",
  email: "rose@hotmail.com",
  birthDate: new Date("2000-08-05"),
  userName: "roselibarbosa",
};

describe("Create User Use Case", () => {
  const MockSaveUserRepository = mocked(UserRepository, true);

  beforeEach(() => {
    container.clearInstances();
    MockSaveUserRepository.mockClear();
  });
  it("should be able to create a new user", async () => {
    const createUser = jest.fn().mockResolvedValue(UserSavedMock);
    const findByEmail = jest.fn().mockResolvedValue(null);
    const findByUserName = jest.fn().mockResolvedValue(null);

    MockSaveUserRepository.mockImplementation(
      () =>
        ({
          createUser,
          findByEmail,
          findByUserName,
        } as unknown as UserRepository)
    );
    const createUserUseCase = container.resolve(CreateUserUseCase);

    const user = await createUserUseCase.execute(
      mockUserPayload as ICreateUserDTO
    );

    expect(createUser).toBeCalledTimes(1);
    expect(user).toHaveProperty("name");
    expect(user).toHaveProperty("email");
    expect(user).toHaveProperty("userName");
  });
  it("should return error when creating user with a existent email", async () => {
    const findByEmail = jest.fn().mockResolvedValue(UserSavedMock);

    MockSaveUserRepository.mockImplementation(
      () =>
        ({
          findByEmail,
        } as unknown as UserRepository)
    );

    expect(async () => {
      const createUserUseCase = container.resolve(CreateUserUseCase);
      await createUserUseCase.execute(mockUserPayload as ICreateUserDTO);
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should return error when creating user with a existent userName", async () => {
    const findByEmail = jest.fn().mockResolvedValue(undefined);
    const findByUserName = jest.fn().mockResolvedValue(UserSavedMock);

    MockSaveUserRepository.mockImplementation(
      () =>
        ({
          findByEmail,
          findByUserName,
        } as unknown as UserRepository)
    );

    expect(async () => {
      const createUserUseCase = container.resolve(CreateUserUseCase);
      await createUserUseCase.execute(mockUserPayload as ICreateUserDTO);
    }).rejects.toBeInstanceOf(AppError);
  });
  it("should return an error because the user did not exist but could not create it", async () => {
    const findByEmail = jest.fn().mockResolvedValue(undefined);
    const createUser = jest.fn().mockResolvedValue(undefined);
    const findByUserName = jest.fn().mockResolvedValue(undefined);

    MockSaveUserRepository.mockImplementation(
      () =>
        ({
          createUser,
          findByEmail,
          findByUserName,
        } as unknown as UserRepository)
    );

    try {
      const createUserUseCase = container.resolve(CreateUserUseCase);
      await createUserUseCase.execute(mockUserPayload as ICreateUserDTO);

      expect(true).toBe(false);
    } catch (error) {
      expect(error).toHaveProperty("statusCode", 400);
      expect(error).toHaveProperty("message");
      expect(error.message).toContain(
        "Ocorreu um problema ao cadastrar o usuário"
      );
    }
  });
});
