import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Map } from 'leaflet';
//import { MarkerClusterGroup } from 'leaflet.markercluster';
import 'rxjs/add/operator/map';
import 'leaflet.markercluster/dist/leaflet.markercluster';

@Injectable()
export class BreweryService {

  public map: Map;
  public tiles: any;
  public breweryLayer: any;
  public pubIcon: any;
  public markers: any

  constructor(private http: Http) {
    this.pubIcon = L.icon({
      iconUrl: '../img/pubIcon.png',
      iconSize: [60, 50]
    });

   }

  //  createIcon(){
  //    return this.pubIcon;
  //  }

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
                  this.breweryLayer = L.geoJSON(result, {
                    pointToLayer: function(feature, latlng){
                      var pubIcon = new L.Icon({
                        iconUrl: '../img/pubIcon.png',
                        iconSize: [60, 50]
                      });
                      return L.marker(latlng, {icon: pubIcon});
                    }
                  });
                  this.markers = L.markerClusterGroup({
                    iconCreateFunction: function(cluster){
                      return this.pubIcon = new L.Icon({
                        iconUrl: '../img/pubIcon.png',
                        iconSize: [60, 50]
                      });
                    }, disableClusteringAtZoom: 13,
                    showCoverageOnHover: false
                  });
                  this.markers.addLayer(this.breweryLayer);
                  //this.breweryLayer.addTo(this.map);
                  this.markers.addTo(this.map);
              });
   }

}
