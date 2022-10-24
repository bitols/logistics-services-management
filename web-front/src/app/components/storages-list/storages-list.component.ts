import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Storages } from 'src/app/models/storages.model';
import { NotificationService } from 'src/app/services/notification.service';
import { SessionsService } from 'src/app/services/sessions.service';
import { StoragesService } from 'src/app/services/storages.service';
import { AddStoragesComponent } from '../add-storages/add-storages.component';

@Component({
  selector: 'app-storages-list',
  templateUrl: './storages-list.component.html',
  styleUrls: ['./storages-list.component.css']
})
export class StoragesListComponent implements OnInit {

  storages: Storages[] = [];
  currentStorage: Storages = {};
  currentIndex = -1;
  name = '';

  page = 1;
  count = 0;
  pageSize = 3;
  pageSizes = [3, 6, 9];

  constructor(
    private storagesService: StoragesService,
    private sessionsService: SessionsService,
    private notificationService: NotificationService,
    private modalService: NgbModal
    ) { }

  ngOnInit(): void {
    this.refreshList();
  }


  refreshList(): void {
    this.searchStorages();
    this.currentStorage = {};
    this.currentIndex = -1;
  }

  searchStorages(): void {
    if( this.name ) {
      this.retrieveStoragesByName();
    } else {
      this.retrieveAllStorages();
    }

  }

  retrieveAllStorages(): void {
    this.storagesService.getAll(this.sessionsService.getUser().senderId)
      .subscribe({
        next: (data) => {
          this.storages = data;
          this.count = data.length;
        },
        error: (e) => {
          console.error(e);
          this.notificationService.showError(`Problem to retrieve storages`);
        }
      });
  }

  retrieveStoragesByName(): void {
    this.storagesService.getAllByName(
      this.sessionsService.getUser().senderId,
      this.name
    )
      .subscribe({
        next: (data) => {
          this.storages = data;
          this.count = data.length;
        },
        error: (e) =>  {
          console.error(e);
          this.notificationService.showError(`Problem to retrieve storages`);
        }
      });
  }

  setActiveStorage(storage: Storages, index: number): void {
    this.currentStorage = storage;
    this.currentIndex = index;
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
   }

  handlePageChange(event: number): void {
    this.page = event;
  }

  addStorages(): void {
    const modalRef = this.modalService.open(AddStoragesComponent);
    modalRef.result.then((result) => {
      if(result==='Success') {
        this.refreshList();
      }
    });
  }

}
