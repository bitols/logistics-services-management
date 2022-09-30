import { GetLocationFromAddressUseCase } from '@modules/geolocation/useCases/GetLocationFromAddressUseCase';
import { UpdateStoragesLocationUseCase } from '@modules/storages/useCases/UpdateStoragesLocationUseCase';
import { container } from 'tsyringe';

export const storageLocation = async (message: string): Promise<void> => {
  try {
    console.log(`storageLocation message received: ${message}`);
    const requestLocation = JSON.parse(message);

    const getLocationFromAddress = container.resolve(
      GetLocationFromAddressUseCase,
    );

    const updateStorageLocation = container.resolve(
      UpdateStoragesLocationUseCase,
    );

    const location = await getLocationFromAddress.execute(
      requestLocation.address,
    );

    await updateStorageLocation.execute({
      id: requestLocation.id,
      location,
    });
  } catch (error: any) {
    console.log(error.message);
  }
};
