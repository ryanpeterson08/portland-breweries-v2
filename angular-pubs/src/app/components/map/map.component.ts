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
    this.breweryService.makeMap();

    this.breweryService.getBreweries();

    
  }

}
