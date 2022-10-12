import { Component, OnInit, ViewChild } from '@angular/core';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { Storages } from 'src/app/models/storages.model';
import { NotificationService } from 'src/app/services/notification.service';
import { SessionsService } from 'src/app/services/sessions.service';
import { StoragesService } from 'src/app/services/storages.service';

@Component({
  selector: 'app-storages-manager',
  templateUrl: './storages-manager.component.html',
  styleUrls: ['./storages-manager.component.css']
})
export class StoragesManagerComponent implements OnInit {

  storages: Storages[] = [];
  currentStorage: Storages = {};

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
    private notificationService: NotificationService
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
          this.notificationService.showError(`Problem to retrieve storages`,'Fail');
        }
      });
  }

  openInfoWindow(marker: MapMarker) {
    // this is called when the marker is clicked.
    this.infoWindow.open(marker);
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
}
