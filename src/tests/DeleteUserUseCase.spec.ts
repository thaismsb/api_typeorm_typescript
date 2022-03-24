import "../container";
import { mocked } from "jest-mock";
import { container } from "tsyringe";
import { DeleteUserUseCase } from "../usecases/DeleteUserUseCase";
import { UserRepository } from "../repositories/implementations/UserRepository";
import { AppError } from "../Classes/AppError";

jest.mock("../repositories/implementations/UserRepository");
describe("Delete User Use Case", () => {
  const MockDeleteUserByIdRepository = mocked(UserRepository, true);

  beforeEach(() => {
    container.clearInstances();
    MockDeleteUserByIdRepository.mockClear();
  });

  it("shouldn't be able to delete a user because its id doesn't exist in the database", async () => {
    const findById = jest.fn().mockResolvedValue(undefined);

    MockDeleteUserByIdRepository.mockImplementation(
      () => ({ findById } as unknown as UserRepository)
    );

    expect(async () => {
      const deleteUserUseCase = container.resolve(DeleteUserUseCase);
      const userId = "d95e94d4-d030-4ae8-9051-3ce17be00414";
      await deleteUserUseCase.execute(userId);
    }).rejects.toBeInstanceOf(AppError);
  });
  it("should be able to delete a user", async () => {
    const findById = jest.fn().mockResolvedValue({});
    const deleteUser = jest.fn();

    MockDeleteUserByIdRepository.mockImplementation(
      () => ({ findById, deleteUser } as unknown as UserRepository)
    );

    const deleteUserUseCase = container.resolve(DeleteUserUseCase);
    const userId = "d95e94d4-d030-4ae8-9051-3ce17be00414";

    await deleteUserUseCase.execute(userId);

    expect(deleteUser).toBeCalledTimes(1);
  });
});
