import "../container";
import { mocked } from "jest-mock";
import { container } from "tsyringe";
import { UserRepository } from "../repositories/implementations/UserRepository";
import { usersMockSearch } from "../mocks/users";
import { GetUserByNameAndEmailUseCase } from "../usecases/GetUserByNameAndEmailUseCase";
import { AppError } from "../Classes/AppError";

jest.mock("../repositories/implementations/UserRepository");

describe("Get Companies Use Case", () => {
  const MockedSearchCompanyRepository = mocked(UserRepository, true);

  beforeEach(() => {
    container.clearInstances();
  });

  it("should respond with an array of users that matches the search by the user name or email", async () => {
    const payloadMock = { name: "d" };
    const findByNameAndEmail = jest.fn().mockResolvedValue(usersMockSearch);

    MockedSearchCompanyRepository.mockImplementation(
      () =>
        ({
          findByNameAndEmail,
        } as unknown as UserRepository)
    );

    const searchUserUseCase = container.resolve(GetUserByNameAndEmailUseCase);
    const users = await searchUserUseCase.execute(payloadMock);

    expect(findByNameAndEmail).toBeCalledWith(payloadMock);
    expect(users).toEqual(usersMockSearch);
  });

  it("should respond with an error", async () => {
    const payloadMock = { name: "d" };
    const findByNameAndEmail = jest.fn().mockResolvedValue(undefined);

    MockedSearchCompanyRepository.mockImplementation(
      () =>
        ({
          findByNameAndEmail,
        } as unknown as UserRepository)
    );

    expect(async () => {
      const searchUserUseCase = container.resolve(GetUserByNameAndEmailUseCase);
      const users = await searchUserUseCase.execute(payloadMock);
      expect(findByNameAndEmail).toBeCalledWith(payloadMock);
      expect(users).toEqual(usersMockSearch);
    }).rejects.toBeInstanceOf(AppError);
  });
});
