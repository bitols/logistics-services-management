export interface IUpdateStorageLocationUseCase {
  execute(request: { id: string; message: string }): Promise<void>;
}
