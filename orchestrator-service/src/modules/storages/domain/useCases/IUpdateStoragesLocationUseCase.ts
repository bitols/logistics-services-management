export interface IUpdateStorageLocationUseCase {
  execute(request: { id: string; address: string }): Promise<void>;
}
