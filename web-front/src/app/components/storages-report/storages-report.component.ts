import { Component, OnInit } from '@angular/core';
import { StoragesReport } from 'src/app/models/storages-report.model';
import { Storages } from 'src/app/models/storages.model';
import { NotificationService } from 'src/app/services/notification.service';
import { SessionsService } from 'src/app/services/sessions.service';
import { StoragesService } from 'src/app/services/storages.service';
import { ChartConfiguration } from 'chart.js';
@Component({
  selector: 'app-storages-report',
  templateUrl: './storages-report.component.html',
  styleUrls: ['./storages-report.component.css']
})
export class StoragesReportComponent implements OnInit {

  storages: Storages[] = [];
  currentStorage: Storages = {};

  storageReport: StoragesReport = {};

  // Doughnut
  public storedVolumeChartLabels: string[] = [];
  public storedVolumeChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] = [];
  public storedVolumeChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    maintainAspectRatio: false
  };

  //bar
  public percentVolumeChartPlugins = [];
  public percentVolumeChartData?: ChartConfiguration<'bar'>['data'];
  public percentVolumeChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false
  };

    //bar
    public storedValueChartPlugins = [];
    public storedValueChartData?: ChartConfiguration<'bar'>['data'];
    public storedValueChartOptions: ChartConfiguration<'bar'>['options'] = {
      responsive: true,
      maintainAspectRatio: false
    };

    // PolarArea
    public storedQuantityChartLabels: string[] = [];
    public storedQuantityChartDatasets: ChartConfiguration<'polarArea'>['data']['datasets'] = [];
    public storedQuantityOptions: ChartConfiguration<'polarArea'>['options'] = {

      responsive: true,
      maintainAspectRatio: false
    };

  constructor(
    private storagesService: StoragesService,
    private sessionsService: SessionsService,
    private notificationService: NotificationService,
  ) { }

  ngOnInit(): void {
    this.retrieveAllStorages();
  }

  refreshData():void {
    this.cleanCharts();
    this.retrieveStorageReport();

  }

  retrieveAllStorages(): void {
    this.storagesService.getAll(this.sessionsService.getUser().senderId)
      .subscribe({
        next: (data) => {
          this.storages = data;
        },
        error: (e) => {
          console.error(e);
          this.notificationService.showError(`Problem to retrieve storages`);
        }
      });
  }

  retrieveStorageReport(): void {
    this.storagesService.getStoragesReport(this.currentStorage.id)
      .subscribe({
        next: (data) => {
          this.storageReport = data;
          this.populateCharts();
        },
        error: (e) => {

          this.cleanCharts();
          console.error(e);
          this.notificationService.showError(`Problem to retrieve storages report`);
        }
      });
  }

  cleanCharts(): void {
    this.storedVolumeChartLabels = [];
    this.storedQuantityChartLabels  = [];
    this.storageReport = {}
  }

  getProductMaxQuantity(): string {
    const product = this.storageReport.products?.reduce((prev, current) => {
      return prev.items! > current.items! ? prev : current
    }
  );
    return product!.name!;
  }

  getProductMaxVolume(): string {
    const product = this.storageReport.products?.reduce((prev, current) => {
      return prev.stored! > current.stored! ? prev : current
    }
  );
    return product!.name!;
  }

  getProductMaxValue(): string {
    const product = this.storageReport.products?.reduce((prev, current) => {
      return prev.value! > current.value! ? prev : current
    }
  );
    return product!.name!;
  }

  populateCharts(): void {
    this.percentVolumeChartData = {
      labels: [ 'Armazenamento(%)'],
      datasets: [ ]
    };

    this.storedVolumeChartDatasets = [
      { data: [], label: 'Volumes' }
    ];

    this.storedQuantityChartDatasets = [
      { data: [], label:'Quantidades' }
    ];

    this.storedValueChartData = {
      labels: [ '(R$)'],
      datasets: [ ]
    };

    this.storageReport.products?.forEach((product => {
      this.percentVolumeChartData?.datasets.push({data: [product.usage!], label: product.name});

      this.storedVolumeChartLabels.push(product.name!);
      this.storedVolumeChartDatasets[0].data.push(product.stored!);

      this.storedQuantityChartLabels.push(product.name!);
      this.storedQuantityChartDatasets[0].data.push(product.items!);

      this.storedValueChartData?.datasets.push({data: [product.value!], label: product.name});
    }));


    const volumeEmpty = this.storageReport.capacity! - this.storageReport.stored!;
    if (volumeEmpty>0) {
      this.storedVolumeChartLabels.push('Espaço vazio');
      this.storedVolumeChartDatasets[0].data.push(volumeEmpty);
    }

    const percentEmpty = 100 - this.storageReport.usage!
    if (percentEmpty>0) {
      this.percentVolumeChartData?.datasets.push({data: [percentEmpty], label: 'Espaço vazio'})
    }


  }
}
