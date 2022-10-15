import { IStoragesCapacityControl } from '@modules/reports/domain/models/requests/IStoragesCapacityControl';
import StoragesCapacityChangeUseCase from '@modules/reports/useCases/StoragesCapacityChangeUseCase';
import { container } from 'tsyringe';
export const storageCapacityControl = async (
  message: string,
): Promise<void> => {
  try {
    console.log(`storageCapacityControl message received: ${message}`);
    const storagesCapacityControl = JSON.parse(
      message,
    ) as IStoragesCapacityControl;

    const storagesCapacityChange = container.resolve(
      StoragesCapacityChangeUseCase,
    );

    await storagesCapacityChange.execute(storagesCapacityControl);
  } catch (error: any) {
    console.log(error.message);
  }
};
