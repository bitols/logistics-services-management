import GetStoragesReportUseCase from '@modules/reports/useCases/GetStoragesReportUseCase';
import RegisterStoragesReportUseCase from '@modules/reports/useCases/RegisterStoragesReportUseCase';
import { Response, Request } from 'express';
import { container } from 'tsyringe';

export default class ReportsController {
  public async getStoragesReport(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { storageId } = request.params;

    const getStoragesReport = container.resolve(GetStoragesReportUseCase);
    const storagesCapacity = await getStoragesReport.execute({
      storageId,
    });
    return response.json(storagesCapacity);
  }

  public async registerStoragesReport(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const {
      storageId,
      capacity,
      stored,
      usage,
      products,
      value,
      senderId,
      items,
    } = request.body;

    const registerStoragesCapacity = container.resolve(
      RegisterStoragesReportUseCase,
    );
    const storageCapacity = await registerStoragesCapacity.execute({
      storageId,
      capacity,
      stored,
      usage,
      products,
      value,
      senderId,
      items,
    });

    return response.json(storageCapacity);
  }
}
