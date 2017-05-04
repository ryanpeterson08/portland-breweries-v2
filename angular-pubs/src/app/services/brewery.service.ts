import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Map } from 'leaflet';
//import { MarkerClusterGroup } from 'leaflet.markercluster';
import 'rxjs/add/operator/map';
import 'leaflet.markercluster/dist/leaflet.markercluster';
import * as $ from 'jquery';

@Injectable()
export class BreweryService {

  public map: Map;
  public tiles: any;
  public breweryLayer: any;
  public pubIcon: any;
  public flagIcon: any;
  public markers: any;



  constructor(private http: Http) {}

  createPubIcon(){
   this.pubIcon = L.icon({
     iconUrl: 'https://rawgit.com/ryanpeterson08/portland-breweries/master/img/pubIcon.png',
     //iconUrl: '../img/pubIcon.png',
     iconSize: [60, 50]
   });
   return this.pubIcon;
  }
  createFlagIcon(){
    this.flagIcon = L.icon({
      iconUrl: 'https://rawgit.com/ryanpeterson08/portland-breweries/master/img/flag.png',
      iconSize: [30, 50]
    });
    return this.flagIcon;
  }

  makeMap(){
   this.map = L.map('map').setView([45.47, -122.69], 10);
   this.tiles = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.{ext}', {
     attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
     ext: 'png'
   }).addTo(this.map);
  }

  //for component to have access to pubs and create a checklist in the html
  createPubArray(){
    var pubArray = [];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/map/pubs', {headers:headers})
               .map(res => res.json())

  }


   getBreweries(){

     let headers = new Headers();
     headers.append('Content-Type', 'application/json');
     return this.http.get('http://localhost:3000/map/pubs', {headers:headers})
                .map(res => res.json())
                .subscribe(result => {
                  this.breweryLayer = L.geoJSON(result, {
                    pointToLayer: (feature, latlng) => {
                      if(feature.properties.Visited === false){
                        return L.marker(latlng, {icon: this.createPubIcon()});
                      } else {
                        return L.marker(latlng, {icon: this.createFlagIcon()});
                      }
                    },
                    onEachFeature: (feature, layer) => {
                      feature.layer = layer;
                      var breweryName = feature.properties.Brewery;
                      var breweryAddress = feature.properties.Address;
                      var breweryLink = feature.properties.Website;
                      var breweryVisited = feature.properties.Visited;
                      var popup = layer.bindPopup("<h5>" + breweryName + "</h5><p>" + breweryAddress + "</p><a href='" + breweryLink + "' target='_blank'>" + breweryLink + "</a><br>");
                    }
                  });
                  this.markers = L.markerClusterGroup({
                    iconCreateFunction: (cluster) => {
                      return this.createPubIcon();
                    },
                    disableClusteringAtZoom: 13,
                    showCoverageOnHover: false
                  });
                  this.markers.addLayer(this.breweryLayer);
                  this.markers.addTo(this.map);
              });
   }

   updateVisit(pub){
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put('http://localhost:3000/map/pub/'+ pub._id, JSON.stringify(pub), {headers:headers})
            .map(res => res.json());
    }

}

//
