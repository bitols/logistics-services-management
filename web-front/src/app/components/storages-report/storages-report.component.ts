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
  public doughnutChartLabels: string[] = [ 'Download Sales', 'In-Store Sales', 'Mail-Order Sales' ];
  public doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] = [
      { data: [ 350, 450, 100 ], label: 'Series A' }
    ];

  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    maintainAspectRatio: false
  };

  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [ '2006', '2007', '2008', '2009', '2010', '2011', '2012' ],
    datasets: [
      { data: [ 65, 59, 80, 81, 56, 55, 40 ], label: 'Series A' },
      { data: [ 28, 48, 40, 19, 86, 27, 90 ], label: 'Series B' }
    ]
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false
  };

    // PolarArea
    public polarAreaChartLabels: string[] = [ 'Download Sales', 'In-Store Sales', 'Mail Sales', 'Telesales', 'Corporate Sales' ];
    public polarAreaChartDatasets: ChartConfiguration<'polarArea'>['data']['datasets'] = [
      { data: [ 300, 500, 100, 40, 120 ] }
    ];
    public polarAreaLegend = true;

    public polarAreaOptions: ChartConfiguration<'polarArea'>['options'] = {
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
        },
        error: (e) => {
          console.error(e);
          this.notificationService.showError(`Problem to retrieve storages report`);
        }
      });
  }
}
