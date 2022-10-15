import { IStoragesReportRepository } from '@modules/reports/domain/repositories/IStoragesReportRepository';
import { dataSource } from '@config/orm';

import { IRegisterStoragesReport } from '@modules/reports/domain/models/requests/IRegisterStoragesReport';
import { IStorageReport } from '@modules/reports/domain/models/entities/IStorageReport';
import StorageReport from '../entities/StorageReport';

export class StoragesReportRepository implements IStoragesReportRepository {
  private ormRepository;
  constructor() {
    this.ormRepository = dataSource.getRepository(StorageReport);
  }

  public async create(data: IRegisterStoragesReport): Promise<IStorageReport> {
    console.log(`create storage reports: ${JSON.stringify(data)}`);

    const storageReport = this.ormRepository.create(data);

    return storageReport;
  }

  public async save(storageReport: IStorageReport): Promise<IStorageReport> {
    console.log(`save storage reports: ${JSON.stringify(storageReport)}`);

    await this.ormRepository.save(storageReport);

    return storageReport;
  }

  public async getByStorageId(
    storage: string,
  ): Promise<IStorageReport | null | undefined> {
    console.log(`get storage reports by storageId: ${storage}`);

    const storageReport = await this.ormRepository.findOneBy({
      storageId: storage,
    });

    return storageReport;
  }

  public async getAllBySender(sender: string): Promise<IStorageReport[]> {
    console.log(`get all storages reports by senderId: ${sender}`);

    const storagesReport = await this.ormRepository.findBy({
      senderId: sender,
    });

    return storagesReport;
  }
}
