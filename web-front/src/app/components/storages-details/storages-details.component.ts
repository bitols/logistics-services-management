import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Storages } from 'src/app/models/storages.model';
import { NotificationService } from 'src/app/services/notification.service';
import { StoragesService } from 'src/app/services/storages.service';

@Component({
  selector: 'app-storages-details',
  templateUrl: './storages-details.component.html',
  styleUrls: ['./storages-details.component.css']
})
export class StoragesDetailsComponent implements OnInit {
  @Input() viewMode = false;

  @Input() currentStorage: Storages = {};

  message = '';

  constructor(
    private storagesService: StoragesService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService,
  ) { }

  ngOnInit(): void {
    this.message = '';
    if(this.route.snapshot.params["id"]) {
      this.getStorage(this.route.snapshot.params["id"]);
    }
  }

  getStorage(id: string): void {
    this.storagesService.get(id)
      .subscribe({
        next: (data) => {
          this.currentStorage = data;
          console.log(data);
        },
        error: (e) => {
          console.error(e);
          this.notificationService.showError(`Problem to retrieve storage`,'Fail');
        }
      });
  }


  deleteStorage(): void {
    this.storagesService.delete(this.currentStorage.id)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.notificationService.showSuccess('Storage deleted','Success');
          this.reloadPage();
        },
        error: (e) => {
          console.error(e);
          this.notificationService.showError(e.error.message,'Fail');
        }
      });
  }


  reloadPage(): void {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
        console.log(currentUrl);
    });
  }

}
