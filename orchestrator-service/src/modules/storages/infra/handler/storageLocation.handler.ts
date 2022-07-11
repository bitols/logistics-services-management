import { GetLocationFromAddressUseCase } from '@modules/geolocation/useCases/GetLocationFromAddressUseCase';
import { UpdateStoragesLocationUseCase } from '@modules/storages/useCases/UpdateStoragesLocationUseCase';
import { container } from 'tsyringe';

export const storageLocation = async (message: string): Promise<void> => {
  console.log(`storageLocation message received: ${message}`);

  const getLocationFromAddress = container.resolve(
    GetLocationFromAddressUseCase,
  );

  const updateStorageLocation = container.resolve(
    UpdateStoragesLocationUseCase,
  );

  const parsedMessage = JSON.parse(message);
  const location = await getLocationFromAddress.execute(parsedMessage.address);

  await updateStorageLocation.execute({
    id: parsedMessage.id,
    location,
  });
};
