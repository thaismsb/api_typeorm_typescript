import "../container";
import { mocked } from "jest-mock";
import { container } from "tsyringe";
import { GetAllUsersUseCase } from "../usecases/GetAllUsersUseCase";
import { UserRepository } from "../repositories/implementations/UserRepository";
import { usersMock, cleanUsersMock } from "../mocks/users";

jest.mock("../repositories/implementations/UserRepository");

describe("Get Users Use Case", () => {
  const MockedGetAllUsersRepository = mocked(UserRepository, true);

  beforeEach(() => {
    container.clearInstances();
  });

  it("should respond with an array of Users", async () => {
    //usersMock
    const getAll = jest.fn().mockResolvedValue(usersMock);

    MockedGetAllUsersRepository.mockImplementation(
      () =>
        ({
          getAll,
        } as unknown as UserRepository)
    );

    //payload
    const getAllUsersUseCase = container.resolve(GetAllUsersUseCase);
    const users = await getAllUsersUseCase.execute();

    expect(getAll).toBeCalledWith();

    //companiesUseCaseMock
    expect(users).not.toBeNull();

    const [first] = users;
    expect(first).toHaveProperty("id");
    expect(first).toHaveProperty("email");
    expect(first).toHaveProperty("userName");
  });

  // it("should respond with an empty array of users", async () => {
  //   const getAll = jest.fn().mockResolvedValue([]);

  //   MockedGetAllUsersRepository.mockImplementation(
  //     () =>
  //       ({
  //         getAll,
  //       } as unknown as UserRepository)
  //   );

  //   const getAllUsersUseCase = container.resolve(GetAllUsersUseCase);
  //   const users = await getAllUsersUseCase.execute();

  //   expect(getAll).toBeCalledWith();

  //   expect(users).toEqual(cleanUsersMock);
  // });
});
