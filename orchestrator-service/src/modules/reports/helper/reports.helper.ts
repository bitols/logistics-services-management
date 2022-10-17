import { IProductStorageReport } from '../domain/models/entities/IProductStorageReport';
import { IStorageReport } from '../domain/models/entities/IStorageReport';
import { IStorageProducts } from '../domain/models/requests/IStoragesProductControl';

export const productToReport = async (
  storageProduct: IStorageProducts,
  capacity: number,
): Promise<IProductStorageReport> => {
  return {
    id: storageProduct.id,
    name: storageProduct.name,
    items: storageProduct.quantity,
    value: storageProduct.value,
    stored:
      storageProduct.height *
      storageProduct.lenght *
      storageProduct.width *
      storageProduct.quantity,
    usage:
      (storageProduct.height *
        storageProduct.lenght *
        storageProduct.width *
        storageProduct.quantity *
        100) /
      capacity,
  };
};

export const recalculateStorageReport = async (
  storageReport: IStorageReport,
): Promise<void> => {
  if (storageReport.products.length) {
    const totalStored = storageReport.products
      .map(totalStored => {
        return {
          stored: totalStored.stored,
          usage: totalStored.usage,
          value: totalStored.value,
          items: totalStored.items,
        };
      })
      .reduce((acc, info) => {
        acc.stored += info.stored;
        acc.items += info.items;
        acc.value += info.value;
        acc.usage = (acc.stored * 100) / storageReport.capacity;

        return acc;
      });

    storageReport.items = totalStored.items;
    storageReport.stored = totalStored.stored;
    storageReport.value = totalStored.value;
    storageReport.usage = totalStored.usage;
  } else {
    storageReport.items = 0;
    storageReport.stored = 0;
    storageReport.value = 0;
    storageReport.usage = 0;
  }
};
