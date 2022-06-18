import { UpdateStoragesLocationUseCase } from '@modules/storages/useCases/UpdateStoragesLocationUseCase';
import { container } from 'tsyringe';

export const storageLocation = async (message: string): Promise<void> => {
  console.log(`storageLocation message received: ${message}`);

  const updateStorageLocation = container.resolve(
    UpdateStoragesLocationUseCase,
  );

  await updateStorageLocation.execute(JSON.parse(message));
};
