export interface IGenerateStoragesIndicatorsUseCase {
  execute(id: string): Promise<void>;
}
