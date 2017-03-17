import { Component, OnInit } from '@angular/core';
import { BreweryService } from '../../services/brewery.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  providers: [BreweryService]
})
export class MapComponent implements OnInit {

  constructor(private breweryService: BreweryService) { }

  ngOnInit() {
    let map = L.map('map').setView([45.47, -122.69], 13);
    map.addLayer(this.breweryService.tiles);
    this.breweryService.map = map;
  }

}
