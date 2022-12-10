import { GetLocationFromAddressUseCase } from '@modules/geolocation/useCases/GetLocationFromAddressUseCase';
import { UpdateStoragesLocationUseCase } from '@modules/storages/useCases/UpdateStoragesLocationUseCase';
import { container } from 'tsyringe';

export const storageLocation = async (message: string): Promise<void> => {
  const scope = '[storageLocation.handler]';
  try {
    console.time(`[INFO]${scope} Total execution`);

    console.log(`[INFO]${scope}  message received:${message}`);
    const requestLocation = JSON.parse(message);

    const getLocationFromAddress = container.resolve(
      GetLocationFromAddressUseCase,
    );

    const updateStorageLocation = container.resolve(
      UpdateStoragesLocationUseCase,
    );
    console.time(
      `[INFO]${scope} Request location for address: ${requestLocation.address} to Google's Geocode Api`,
    );
    const location = await getLocationFromAddress.execute(
      requestLocation.address,
    );
    console.timeEnd(
      `[INFO]${scope} Request location for address: ${requestLocation.address} to Google's Geocode Api`,
    );

    console.time(
      `[INFO]${scope} Update storageId: ${
        requestLocation.id
      } location: ${JSON.stringify(location)}`,
    );
    await updateStorageLocation.execute({
      id: requestLocation.id,
      location,
    });
    console.timeEnd(
      `[INFO]${scope} Update storageId: ${
        requestLocation.id
      } location: ${JSON.stringify(location)}`,
    );

    console.timeEnd(`[INFO]${scope} Total execution`);
  } catch (error: any) {
    console.error(`[ERR]${scope}${error.message}`);
    console.timeEnd(`[INFO]${scope} Total execution`);
  }
};
