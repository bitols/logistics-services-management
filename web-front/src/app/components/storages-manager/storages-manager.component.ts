import { Component, OnInit, ViewChild } from '@angular/core';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Products } from 'src/app/models/products.model';
import { Storages } from 'src/app/models/storages.model';
import { NotificationService } from 'src/app/services/notification.service';
import { SessionsService } from 'src/app/services/sessions.service';
import { StoragesService } from 'src/app/services/storages.service';
import { AddStoragesProductsComponent } from '../add-storages-products/add-storages-products.component';
import { RmvStoragesProductsComponent } from '../rmv-storages-products/rmv-storages-products.component';

@Component({
  selector: 'app-storages-manager',
  templateUrl: './storages-manager.component.html',
  styleUrls: ['./storages-manager.component.css']
})
export class StoragesManagerComponent implements OnInit {

  storages: Storages[] = [];
  currentStorage: Storages = {};
  products: Products[] = [];

  page = 1;
  count = 0;
  pageSize = 5;
  pageSizes = [5, 10, 20];

  @ViewChild(GoogleMap, { static: false })
  map!: GoogleMap;
  @ViewChild(MapInfoWindow, { static: false })
  infoWindow!: MapInfoWindow;

  mapZoom = 12;
  mapCenter!: google.maps.LatLng;
  mapOptions: google.maps.MapOptions = {
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    zoomControl: true,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 20,
    minZoom: 4,
  };

  markerInfoContent = '';
  markerOptions: google.maps.MarkerOptions = {
    draggable: false,
    animation: google.maps.Animation.DROP,
  };

  constructor(
    private storagesService: StoragesService,
    private sessionsService: SessionsService,
    private notificationService: NotificationService,
    private modalService: NgbModal
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

  openInfoWindow(marker: MapMarker) {
    // this is called when the marker is clicked.
    this.infoWindow.open(marker);
  }

  refreshData() {
    this.setCurrentLocation();
    this.retrieveCurrentProducts();
  }

  retrieveCurrentProducts() {
    this.storagesService.getStoredProducts(this.currentStorage.id)
      .subscribe({
        next: (data) => {
          this.products = data;
          this.count = data.length;
        },
        error: (e) => {
          console.error(e);
          this.products = [];
          this.count = 0;
          this.notificationService.showError(`Problem to retrieve products`);
        }
      });

  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
   }

  handlePageChange(event: number): void {
    this.page = event;
  }

  setCurrentLocation() {
    const point: google.maps.LatLngLiteral = {
      lat: this.currentStorage.location?.lat as number,
      lng: this.currentStorage.location?.lng as number
    };

    this.mapCenter = new google.maps.LatLng(point);
    this.map.panTo(point);

    this.markerInfoContent = `Endereço: ${this.currentStorage.address}
                              Telefone: ${this.currentStorage.phone}
                              Email: ${this.currentStorage.email}`;
    this.markerOptions = {
      draggable: false,
      animation: google.maps.Animation.DROP,
    };
  }

  addProduct() {
    const modalRef = this.modalService.open(AddStoragesProductsComponent);
    modalRef.componentInstance.storagesId = this.currentStorage.id;
    modalRef.result.then((result) => {
      if(result==='Success') {
        this.refreshData();
      }
    });
  }

  rmvProduct() {
    const modalRef = this.modalService.open(RmvStoragesProductsComponent);
    modalRef.componentInstance.storagesId = this.currentStorage.id;
    modalRef.componentInstance.products = this.products;
    modalRef.result.then((result) => {
      if(result==='Success') {
        this.refreshData();
      }
    });
  }
}
