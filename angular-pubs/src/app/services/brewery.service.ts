import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Map } from 'leaflet';
import 'rxjs/add/operator/map';

@Injectable()
export class BreweryService {

  public map: Map;
  public tiles: any;
  public breweryLayer: any;

  constructor(private http: Http) {

   }

   makeMap(){
     this.map = L.map('map').setView([45.47, -122.69], 13);
     this.tiles = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.{ext}', {
       attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
       ext: 'png'
     }).addTo(this.map);
   }

   getBreweries(){
     let headers = new Headers();
     headers.append('Content-Type', 'application/json');
     return this.http.get('http://localhost:3000/map/pubs', {headers:headers})
                .map(res => res.json())
                .subscribe(result => {
                for(var i = 0; i < result.length; i++){
                  this.breweryLayer = L.geoJSON(result[i]).addTo(this.map);
                }

              });
   }

}
