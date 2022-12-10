import { IStoragesCapacityControl } from '@modules/reports/domain/models/requests/IStoragesCapacityControl';
import StoragesCapacityChangeUseCase from '@modules/reports/useCases/StoragesCapacityChangeUseCase';
import { container } from 'tsyringe';
export const storageCapacityControl = async (
  message: string,
): Promise<void> => {
  const scope = '[storageCapacityControl.handler]';
  try {
    console.time(`[INFO]${scope} Total execution`);

    console.log(`[INFO]${scope}  message received:${message}`);
    const storagesCapacityControl = JSON.parse(
      message,
    ) as IStoragesCapacityControl;

    const storagesCapacityChange = container.resolve(
      StoragesCapacityChangeUseCase,
    );

    console.time(
      `[INFO]${scope} Update report storagesCapacityControl: ${JSON.stringify(
        storagesCapacityControl,
      )}`,
    );
    await storagesCapacityChange.execute(storagesCapacityControl);
    console.timeEnd(
      `[INFO]${scope} Update report storagesCapacityControl: ${JSON.stringify(
        storagesCapacityControl,
      )}`,
    );

    console.timeEnd(`[INFO]${scope} Total execution`);
  } catch (error: any) {
    console.error(`[ERR]${scope}${error.message}`);
    console.timeEnd(`[INFO]${scope} Total execution`);
  }
};
