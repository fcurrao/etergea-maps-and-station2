import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet.markercluster';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements AfterViewInit {
  private map: L.Map | undefined;

  constructor() { }

  ngAfterViewInit(): void {
    this.initMap();
    console.log(this.map )
  }

  private initMap(): void {
    // Inicializa el mapa centrado en una posición específica
    this.map = L.map('myMap', {
      center: [-34.61315, -58.37723], // Buenos Aires, por ejemplo
      zoom: 13,
      zoomControl: true // Habilita los controles de zoom
    });

    // Agrega la capa de los azulejos
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    // Agrega un marcador de ejemplo
    const iconMarker = L.icon({
      iconUrl: './../../assets/marker.png',
      iconSize: [21, 23],
      iconAnchor: [20, 30]
    });

    L.marker([-34.61315, -58.37723], { icon: iconMarker }).addTo(this.map);
  }
}
