import "../container";
import { mocked } from "jest-mock";
import { container } from "tsyringe";
import { UserRepository } from "../repositories/implementations/UserRepository";
import { UpdateUserUseCaseOriginal } from "../usecases/UpdateUserUseCaseOriginal";
import { AppError } from "../Classes/AppError";
import {
  mockUpdateUserUseCase,
  mockUpdateUserUseCaseError,
  mockUpdateUserUseCaseResponse,
} from "../mocks/getUser";
import { UserSavedMock } from "../mocks/user";
import { IUpdateUserDTO } from "../dtos/IUpdateUserDTO";

jest.mock("../repositories/implementations/UserRepository");

describe("Update User Case", () => {
  const MockedUpdateUserRepository = mocked(UserRepository, true);

  beforeEach(() => {
    container.clearInstances();
    MockedUpdateUserRepository.mockClear();
  });

  it("shouldn't be possible to update a user because the user does not exist", async () => {
    const findById = jest.fn().mockResolvedValue(undefined);

    MockedUpdateUserRepository.mockImplementation(
      () => ({ findById } as unknown as UserRepository)
    );

    expect(async () => {
      const UpdateUserUseCase = container.resolve(UpdateUserUseCaseOriginal);
      const user = await UpdateUserUseCase.execute(mockUpdateUserUseCaseError);
      expect(findById).toBeCalledWith(UserSavedMock.id);
      expect(user).toEqual(mockUpdateUserUseCaseResponse);
    }).rejects.toBeInstanceOf(AppError);
  });

  it("shoul be possible to update a user", async () => {
    const findById = jest.fn().mockResolvedValue(UserSavedMock);
    const updateUser = jest.fn().mockResolvedValue(mockUpdateUserUseCase);

    MockedUpdateUserRepository.mockImplementation(
      () => ({ findById, updateUser } as unknown as UserRepository)
    );

    const updateUserUseCase = container.resolve(UpdateUserUseCaseOriginal);

    const user = await updateUserUseCase.execute(
      mockUpdateUserUseCase as IUpdateUserDTO
    );

    expect(updateUser).toBeCalledTimes(1);
    expect(user).toEqual(mockUpdateUserUseCase);
  });

  it("should return an error because the user exists, but could not be updated", async () => {
    const findById = jest.fn().mockResolvedValue(UserSavedMock);
    const updateUser = jest.fn().mockResolvedValue(undefined);

    MockedUpdateUserRepository.mockImplementation(
      () => ({ findById, updateUser } as unknown as UserRepository)
    );

    try {
      const updateUserUseCase = container.resolve(UpdateUserUseCaseOriginal);

      const user = await updateUserUseCase.execute(
        mockUpdateUserUseCase as IUpdateUserDTO
      );

      expect(true).toBe(false);
    } catch (error) {
      expect(error).toHaveProperty("statusCode", 400);
      expect(error).toHaveProperty("message");
      expect(error.message).toContain(
        "Ocorreu um problema ao cadastrar o usuário"
      );
    }

    // expect(async () => {
    //   const updateUserUseCase = container.resolve(UpdateUserUseCaseOriginal);

    //   const user = await updateUserUseCase.execute(
    //     mockUpdateUserUseCase as IUpdateUserDTO
    //   );
    //   expect(updateUser).toBeCalledTimes(1);
    //   expect(user).toEqual(mockUpdateUserUseCase);
    // }).rejects.toBeInstanceOf(AppError);
  });
});
