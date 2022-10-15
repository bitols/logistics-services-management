import { IStoragesProductControl } from '@modules/reports/domain/models/requests/IStoragesProductCOntrol';
import StoragesProductsDecreaseUseCase from '@modules/reports/useCases/StoragesPorductsDecreaseUseCase';
import StoragesProductsIncreaseUseCase from '@modules/reports/useCases/StoragesProductsIncreaseUseCase';
import { container } from 'tsyringe';

export const storageProductControl = async (message: string): Promise<void> => {
  try {
    console.log(`storageProductControl message received: ${message}`);
    const storageProductControl = JSON.parse(
      message,
    ) as IStoragesProductControl;
    if (storageProductControl.increase) {
      const storageProductIncrease = container.resolve(
        StoragesProductsIncreaseUseCase,
      );

      await storageProductIncrease.execute(storageProductControl.storedProduct);
    } else {
      const storageProductDecrease = container.resolve(
        StoragesProductsDecreaseUseCase,
      );

      await storageProductDecrease.execute(storageProductControl.storedProduct);
    }
  } catch (error: any) {
    console.log(error.message);
  }
};
