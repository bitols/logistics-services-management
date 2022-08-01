import GetAllProductsByStorageIdUseCase from '@modules/products/useCases/GetAllProductsByStorageIdUseCase';
import GenerateStoragesCapacitysUseCase from '@modules/reports/useCases/GenerateStoragesCapacityUseCase';
import { IGetStorages } from '@modules/storages/domain/models/requests/IGetStorages';
import GetStoragesUseCase from '@modules/storages/useCases/GetStoragesUseCase';
import { container } from 'tsyringe';

export const storageCapacityControl = async (
  message: string,
): Promise<void> => {
  try {
    console.log(`storageCapacityControl message received: ${message}`);
    const requestStorages = JSON.parse(message) as IGetStorages;

    const getStorages = container.resolve(GetStoragesUseCase);
    const getProductsByStorage = container.resolve(
      GetAllProductsByStorageIdUseCase,
    );
    const generateStoragesCapacity = container.resolve(
      GenerateStoragesCapacitysUseCase,
    );

    const storage = await getStorages.execute(requestStorages);
    const products = await getProductsByStorage.execute({
      storageId: storage.id,
    });

    await generateStoragesCapacity.execute({
      storageId: storage.id,
      senderId: storage.senderId,
      capacity: storage.capacity,
      products: products.map(x => {
        return {
          height: x.height,
          width: x.width,
          lenght: x.lenght,
          price: x.price,
        };
      }),
    });
  } catch (error: any) {
    console.log(error.message);
  }
};
