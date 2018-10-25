import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  // public static readonly CONFIG = {
  //   center: new google.maps.LatLng(50.4388, 30.5542),
  //   mapTypeId: google.maps.MapTypeId.ROADMAP,
  //   zoom: 15
  // };
  public static readonly MARKERS = {
    BAR: 'assets/map/bar.png',
    CAFE: 'assets/map/cafe.png',
    FASTFOOD: 'assets/map/fastfood.png',
    PERSON: 'assets/map/person.png',
    PLACE: 'assets/map/place.png',
    RESTAURANT: 'assets/map/restaurant.png'
  };
  static toRad(value) { /* Converts numeric degrees to radians */
    return value * Math.PI / 180;
  }
  constructor(private afs: AngularFirestore, private http: HttpClient) {}
  haversine(coords1, coords2, r) {
    // https://en.wikipedia.org/wiki/Haversine_formula
    // https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula
    // This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
    // var R = 1.000; // km
    const R = r || 1000000;
    const dLat = MapService.toRad(coords2.lat - coords1.lat);
    const dLon = MapService.toRad(coords2.lng - coords1.lng);
    const lat1 = MapService.toRad(coords1.lat);
    const lat2 = MapService.toRad(coords2.lat);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }
}

// marker.setMap(null); - removes marker from map (not deletes it)
