export interface IProductsQueue {
  produceStoragesCapacity(storageId: string): Promise<void>;
}
