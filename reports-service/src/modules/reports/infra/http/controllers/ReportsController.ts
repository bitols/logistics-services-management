import GetStoragesReportUseCase from '@modules/reports/useCases/GetStoragesReportUseCase';
import RegisterStoragesReportUseCase from '@modules/reports/useCases/RegisterStoragesReportUseCase';
import { Response, Request } from 'express';
import { container } from 'tsyringe';

export default class ReportsController {
  public async getStoragesReport(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const scope = '[ReportsController]';
    const method = '[getStoragesReport]';
    const { storageId } = request.params;
    try {
      console.time(`[INFO]${scope}${method} Total execution`);

      console.log(`[INFO]${scope}${method}  storageId:${storageId}`);
      const getStoragesReport = container.resolve(GetStoragesReportUseCase);
      const storagesCapacity = await getStoragesReport.execute({
        storageId,
      });

      console.time(`[INFO]${scope}${method} Mount response`);
      const responseJson = response.json(storagesCapacity);
      console.timeEnd(`[INFO]${scope}${method} Mount response`);

      console.timeEnd(`[INFO]${scope}${method} Total execution`);
      return responseJson;
    } catch (err: any) {
      console.error(`[ERR]${scope}${method} ${err.message}`);
      console.timeEnd(`[INFO]${scope}${method} Total execution`);
      throw err;
    }
  }

  public async registerStoragesReport(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const scope = '[ReportsController]';
    const method = '[registerStoragesReport]';
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

    try {
      console.time(`[INFO]${scope}${method} Total execution`);
      const registerStoragesCapacity = container.resolve(
        RegisterStoragesReportUseCase,
      );
      console.log(
        `[INFO]${scope}${method} ${JSON.stringify({
          storageId,
          capacity,
          stored,
          usage,
          products,
          value,
          senderId,
          items,
        })}`,
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

      console.time(`[INFO]${scope}${method} Mount response`);
      const responseJson = response.json(storageCapacity);
      console.timeEnd(`[INFO]${scope}${method} Mount response`);

      console.timeEnd(`[INFO]${scope}${method} Total execution`);
      return responseJson;
    } catch (err: any) {
      console.error(`[ERR]${scope}${method} ${err.message}`);
      console.timeEnd(`[INFO]${scope}${method} Total execution`);
      throw err;
    }
  }
}
