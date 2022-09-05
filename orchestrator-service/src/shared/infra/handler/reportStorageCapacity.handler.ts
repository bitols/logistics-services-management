import GenerateStoragesCapacitysUseCase from '@modules/reports/useCases/GenerateStoragesCapacityUseCase';
import { IGetStorages } from '@modules/storages/domain/models/requests/IGetStorages';
import GetStoragesUseCase from '@modules/storages/useCases/GetStoragesUseCase';
import GetStoredProductsUseCase from '@modules/storages/useCases/GetStoredProductsUseCase';
import { container } from 'tsyringe';

export const storageCapacityControl = async (
  message: string,
): Promise<void> => {
  try {
    console.log(`storageCapacityControl message received: ${message}`);
    const requestStorages = JSON.parse(message) as IGetStorages;

    const getStorages = container.resolve(GetStoragesUseCase);
    const getProductsByStorage = container.resolve(GetStoredProductsUseCase);
    const generateStoragesCapacity = container.resolve(
      GenerateStoragesCapacitysUseCase,
    );

    const storage = await getStorages.execute(requestStorages);
    const products = await getProductsByStorage.execute({ id: storage.id });

    await generateStoragesCapacity.execute({
      storageId: storage.id,
      senderId: storage.senderId,
      capacity: storage.capacity,
      products: products.map(x => {
        return {
          productId: x.productId,
          name: x.name,
          height: x.height,
          width: x.width,
          lenght: x.lenght,
          value: x.value,
        };
      }),
    });
  } catch (error: any) {
    console.log(error.message);
  }
};
