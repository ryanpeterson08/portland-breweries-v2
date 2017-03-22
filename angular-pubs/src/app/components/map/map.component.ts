import { Component, OnInit } from '@angular/core';
import { BreweryService } from '../../services/brewery.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  providers: [BreweryService]
})
export class MapComponent implements OnInit {
  pubArray: any = [];

  constructor(private breweryService: BreweryService) { }


  ngOnInit() {
    this.breweryService.makeMap();
    this.breweryService.getBreweries();

    this.breweryService.createPubArray().subscribe(result => {
      for(var i = 0; i < result.length; i++){
        this.pubArray.push(result[i]);
        console.log(this.pubArray[i])
      }
    });

  }




}
