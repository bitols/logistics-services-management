import { IStoragesReportRepository } from '@modules/reports/domain/repositories/IStoragesReportRepository';
import { StoragesReportRepository } from '@modules/reports/infra/orm/repositories/StoragesReportRepository';
import { container } from 'tsyringe';
container.registerSingleton<IStoragesReportRepository>(
  'StoragesReportRepository',
  StoragesReportRepository,
);
