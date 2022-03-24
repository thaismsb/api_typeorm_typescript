import "../container";
import { mocked } from "jest-mock";
import { container } from "tsyringe";
import { mockGetUserUseCaseResponse, payloadMock } from "../mocks/getUser";
import { GetUserByIdUseCase } from "../usecases/GetUserByIdUseCase";
import { UserRepository } from "../repositories/implementations/UserRepository";
import { AppError } from "../Classes/AppError";
import { UserSavedMock } from "../mocks/user";

jest.mock("../repositories/implementations/UserRepository");

describe("Get User Use Case", () => {
  const MockGetUserRepository = mocked(UserRepository, true);

  beforeEach(() => {
    container.clearInstances();
    MockGetUserRepository.mockClear();
  });

  it("shouldn't return a user because its id does not exist in the database", async () => {
    const findById = jest.fn().mockResolvedValue(undefined);

    MockGetUserRepository.mockImplementation(
      () => ({ findById } as unknown as UserRepository)
    );

    // const getUserUseCase = container.resolve(GetUserByIdUseCase);
    // const user = await getUserUseCase.execute(payloadMock.id);

    // expect(findById).toBeCalledWith(payloadMock);

    // expect(user).toEqual(mockGetUserUseCaseResponse);

    expect(async () => {
      const getUserUseCase = container.resolve(GetUserByIdUseCase);
      const user = await getUserUseCase.execute(payloadMock.id);
      expect(findById).toBeCalledWith(payloadMock);
      expect(user).toEqual(mockGetUserUseCaseResponse);
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should return a user", async () => {
    const findById = jest.fn().mockResolvedValue(UserSavedMock);

    MockGetUserRepository.mockImplementation(
      () => ({ findById } as unknown as UserRepository)
    );

    const getUserUseCase = container.resolve(GetUserByIdUseCase);
    const user = await getUserUseCase.execute(payloadMock.id);

    expect(findById).toBeCalledWith(payloadMock);

    expect(user).toEqual(mockGetUserUseCaseResponse);
  });
});
