import { IStorageProducts } from '@modules/storages/domain/models/responses/IStorageProducts';
import AppErrors from '@shared/errors/AppErrors';
import { inject, injectable } from 'tsyringe';
import { IReportsRepository } from '../domain/repositories/IReportsRepository';
import {
  productToReport,
  recalculateStorageReport,
} from '../helper/reports.helper';

@injectable()
export default class StoragesProductsDecreaseUseCase {
  constructor(
    @inject('ReportsRepository')
    private reportsRepository: IReportsRepository,
  ) {}

  public async execute(storageProduct: IStorageProducts): Promise<void> {
    const storageReport = await this.reportsRepository.getStoragesReport({
      storagesId: storageProduct.storageId,
    });

    if (!storageReport) {
      throw new AppErrors('Report not found', 400);
    }

    const productReport = await productToReport(
      storageProduct,
      storageReport.capacity,
    );

    if (storageReport.products.length) {
      storageReport.products
        .filter(product => product.id === productReport.id)
        .forEach(product => {
          if (product.items > 0) {
            product.items -= productReport.items;
            product.stored -= productReport.stored;
            product.value -= productReport.value;
            product.usage = (product.stored * 100) / storageReport.capacity;
          }
        });

      await recalculateStorageReport(storageReport);
      await this.reportsRepository.registerStoragesReport(storageReport);
    }
  }
}
