import { IStoragesProductControl } from '@modules/reports/domain/models/requests/IStoragesProductControl';
import StoragesProductsDecreaseUseCase from '@modules/reports/useCases/StoragesPorductsDecreaseUseCase';
import StoragesProductsIncreaseUseCase from '@modules/reports/useCases/StoragesProductsIncreaseUseCase';
import { json } from 'stream/consumers';
import { container } from 'tsyringe';

export const storageProductControl = async (message: string): Promise<void> => {
  const scope = '[storageProductControl.handler]';
  try {
    console.time(`[INFO]${scope} Total execution`);

    console.log(`[INFO]${scope}  message received:${message}`);
    const storageProductControl = JSON.parse(
      message,
    ) as IStoragesProductControl;

    console.time(
      `[INFO]${scope} Update report storageProductControl: ${JSON.stringify(
        storageProductControl,
      )}`,
    );
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
    console.timeEnd(
      `[INFO]${scope} Update report storageProductControl: ${JSON.stringify(
        storageProductControl,
      )}`,
    );
    console.timeEnd(`[INFO]${scope} Total execution`);
  } catch (error: any) {
    console.error(`[ERR]${scope}${error.message}`);
    console.timeEnd(`[INFO]${scope} Total execution`);
  }
};
