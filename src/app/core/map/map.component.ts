import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MapService } from '../map.service';
import { StoreService } from '../store.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  // @ViewChild('map') mapRef: ElementRef;
  // map: google.maps.Map;
  // you: google.maps.Marker;
  constructor(private store: StoreService) {}
  ngOnInit() {
    // this.map = new google.maps.Map(this.mapRef.nativeElement, MapService.CONFIG);
    // this.you = new google.maps.Marker({
    //   position: MapService.CONFIG.center,
    //   icon: MapService.MARKERS.PERSON,
    //   map: this.map,
    //   title: 'You are here!'
    // });
    // this.store.position$.subscribe(res => {
    //   if (!res) { return; }
    //   const position = new google.maps.LatLng(res.latitude, res.longitude);
    //   this.you.setPosition(position);
    //   this.map.setCenter(position);
    // });
  }
}

/* Google Maps Tutorials */
/* https://developers.google.com/maps/documentation/javascript/tutorial?hl=ru */
/* https://developers.google.com/maps/documentation/javascript/?hl=ru */
/* https://developers.google.com/maps/documentation/javascript/reference/ */
/* https://support.google.com/cloud/answer/6310037 */
