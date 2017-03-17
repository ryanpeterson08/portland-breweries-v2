import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Map } from 'leaflet';

@Injectable()
export class BreweryService {

  public map: Map;
  public tiles: any;

  constructor(private http: Http) {
    this.tiles = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.{ext}', {
      attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      ext: 'png'
    });

   }

}
